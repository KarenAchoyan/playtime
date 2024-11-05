import React, {useEffect, useState} from 'react';
import {Upload, Button, Form, notification} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const fetchDelete = (id) => {
    fetch(process.env.API_URL +'/products/deleteImage/' + id)
        .then(() => {
            notification.success({
                description: "Image deleted successfully",
                duration: 7,
            });
        }).catch(() => {
        notification.error({
            description: "Image not found",
            duration: 7,
        });
    });
};

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
    }
    return isLt2M;
};

const UploadImages = ({images, setFiles}) => {
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        setFileList(images);
    }, [images])

    useEffect(()=>{
        setFiles(fileList)
    },[fileList])

    const handleImagesChange = (info) => {
        const fileLists = [...info.fileList];
        setFileList(fileLists.map(file => file.originFileObj || file));
    };

    const handleRemove = (file) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
        fetchDelete(file.uid);
    };


    function Uploads() {
        useEffect(() => {
            console.log(fileList)
        }, [fileList])
        return (
            <Upload
                accept="image/*"
                multiple
                defaultFileList={fileList}
                onChange={handleImagesChange}
                beforeUpload={beforeUpload}
                listType="picture"
                onRemove={handleRemove}
            >
                <Button icon={<UploadOutlined/>}>Upload Images</Button>
            </Upload>
        )
    }

    return (
        <Form.Item label="Images" name="images" valuePropName="fileList" getValueFromEvent={normFile}>
            <Uploads/>
        </Form.Item>
    );
};

export default UploadImages;
