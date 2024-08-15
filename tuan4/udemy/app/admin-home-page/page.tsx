"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Form, Input, Button, message, Card, Space } from "antd";

const AdminHomePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [websiteInfos, setWebsiteInfos] = useState<
    {
      id: number;
      contactEmail: ReactNode;
      description: ReactNode;
      title: ReactNode;
      
    }[]
  >([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchWebsiteInfos();
  }, []);

  const fetchWebsiteInfos = async () => {
    try {
      const response = await fetch("/api/websiteInfo");
      const data = await response.json();
      setWebsiteInfos(data.websiteInfos);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin:", error);
      message.error("Có lỗi xảy ra khi lấy thông tin website");
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const url = editingId
        ? `/api/websiteInfo?id=${editingId}`
        : "/api/websiteInfo";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(
          editingId ? "Cập nhật thành công!" : "Thêm mới thành công!"
        );
        fetchWebsiteInfos();
        setEditingId(null);
        form.resetFields();
      } else {
        message.error(editingId ? "Cập nhật thất bại" : "Thêm mới thất bại");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      message.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (info: any) => {
    form.setFieldsValue(info);
    setEditingId(info?.id);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const response = await fetch(`/api/websiteInfo?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Xóa thành công!");
        fetchWebsiteInfos();
        if (editingId === id) {
          setEditingId(null);
          form.resetFields();
        }
      } else {
        message.error("Xóa thất bại");
      }
    } catch (error) {
      console.error("Lỗi xóa:", error);
      message.error("Có lỗi xảy ra khi xóa");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Quản lý thông tin khóa học
      </h1>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="bg-gray-100 p-6 rounded-lg shadow-md mb-8"
      >
        <Form.Item
          name="title"
          label="Tiêu đề website"
          rules={[{ required: true }]}
        >
          <Input className="w-full" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} className="w-full" />
        </Form.Item>
        <Form.Item
          name="contactEmail"
          label="Email liên hệ"
          rules={[{ required: true, type: "email" }]}
        >
          <Input className="w-full" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="min-w-[120px]"
          >
            {editingId ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>

      <Space direction="vertical" className="w-full">
        {websiteInfos.map((info) => (
          <Card
            key={info.id}
            title={
              <span className="text-lg font-semibold text-blue-600">
                {info.title}
              </span>
            }
            extra={
              <Space>
                <Button
                  onClick={() => handleEdit(info)}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Sửa
                </Button>
                <Button
                  danger
                  onClick={() => handleDelete(info.id.toString())}
                  className="bg-white-500 text-white hover:bg-red-600"
                >
                  Xóa
                </Button>
              </Space>
            }
            className="mb-4 shadow-md"
          >
            <p className="mb-2">
              <strong className="font-semibold">Mô tả:</strong>{" "}
              {info.description}
            </p>
            <p>
              <strong className="font-semibold">Email liên hệ:</strong>{" "}
              {info.contactEmail}
            </p>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default AdminHomePage;
