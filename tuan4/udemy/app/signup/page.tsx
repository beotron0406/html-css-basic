"use client";
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isEmailExist = async (email: string) => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });
      const data = await response.json();

      if (Array.isArray(data.users)) {
        return data.users.some(
          (user: { email: string }) => user.email === email
        );
      } else {
        console.error("data.users không phải là một mảng:", data.users);
        return false;
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra email:", error);
      return false;
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      if (await isEmailExist(values.email)) {
        message.error("Email đã được sử dụng!");
        setLoading(false);
        return;
      }

      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)
      ) {
        message.error(
          "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số!"
        );
        setLoading(false);
        return;
      }
      const userData = {
        ...values,
        role: "user",
      };

      delete userData.confirm;
      delete userData.agreement;

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        message.success("Đăng ký thành công!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error("Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      message.error("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "86",
      }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Email không hợp lệ!",
          },
          {
            required: true,
            message: "Vui lòng nhập email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
          {
            min: 8,
            message: "Mật khẩu phải có ít nhất 8 ký tự!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại!" },
          { pattern: /^\d{10}$/, message: "Số điện thoại phải gồm 10 chữ số!" },
        ]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Đăng ký
        </Button>
        <p style={{ marginTop: "16px" }}>
          Đã có tài khoản?
          <Link href="/login">
            <Button type="link">Đăng nhập</Button>
          </Link>
        </p>
      </Form.Item>
    </Form>
  );
};

export default App;
