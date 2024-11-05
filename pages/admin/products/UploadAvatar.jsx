import React from 'react';
import {Button, Form, Image, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

const UploadAvatar = ({avatarFile,handleAvatarChange,avatarPreview}) => {
    return (
        <Form.Item label="Avatar" name="avatar">
            <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                fileList={avatarFile ? [avatarFile] : []}
                onChange={handleAvatarChange}
                name={'avatar'}
            >
                {avatarPreview ? (
                    <Image
                        preview={false}
                        src={avatarPreview}
                        alt="Avatar"
                        style={{maxWidth: '100%', maxHeight: '200px'}}
                    />
                ) : (
                    <Button icon={<UploadOutlined/>}>Upload Avatar</Button>
                )}
            </Upload>
        </Form.Item>

    );
};

export default UploadAvatar;