"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';

interface UserInfo {
  email: string;
  phone: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/user-info');
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          form.setFieldsValue(data);
        } else {
          message.error('Không thể tải thông tin người dùng');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        message.error('Đã xảy ra lỗi khi tải thông tin người dùng');
      }
    };

    fetchUserInfo();
  }, [form, router]);

  const onFinish = async (values: UserInfo) => {
    try {
      const response = await fetch('/api/update-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Cập nhật thông tin thành công');
        setUserInfo(values);
      } else {
        message.error('Không thể cập nhật thông tin');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      message.error('Đã xảy ra lỗi khi cập nhật thông tin');
    }
  };

  if (!userInfo) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Vai trò">
          <Input disabled />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;