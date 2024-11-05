import React, {useEffect, useState} from 'react';
import {Button, Popconfirm, Space, Table, Dropdown, DatePicker, Menu, Form, Typography} from "antd";
import {DeleteOutlined, EditOutlined, DownOutlined} from "@ant-design/icons";
import App from "../layouts/app";
import moment from 'moment';
import {filterPayments, getOrders,doneOrInProgress} from "../../../store/payment/actions";
import {useDispatch, useSelector} from "react-redux";
import {jsonToExcel} from "../../../utils/utils";

const {RangePicker} = DatePicker;
const {Text} = Typography;
const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.payment?.orders) || [];
    const [total, setTotal] = useState(0)
    function sendDone(id,done) {
        dispatch(doneOrInProgress.request({id,done}))
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 100

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100

        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
            width: 120

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200


        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 200

        },
        {
            title: 'message',
            dataIndex: 'message',
            key: 'message',
            width: 200
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
            width: 200

        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 200

        },
        {
            title: 'Delivery amount',
            dataIndex: 'total',
            key: 'total',
            width: 200

        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 200,
            render: date => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            width: 200,
            render: products => (
                <Dropdown overlay={renderProductsDropdown(JSON.parse(products))}>
                    <Button>
                        Products <DownOutlined/>
                    </Button>
                </Dropdown>
            )
        },
        {
            title: 'Done Status',
            dataIndex: 'done',
            key: 'done',
            width: 200,
            render: (done, record) => (
                <Button onClick={() => sendDone(record.id, done)}>
                    {done === 0 ? "New" : done === 1 ? "In progress" : "Done"}
                </Button>
            )
        },
    ];

    useEffect(() => {
        dispatch(getOrders.request())
    }, [dispatch]);

    const renderProductsDropdown = products => (
        <Menu>
            {products.map(product => (
                <Menu.Item key={product.id}>
                    <a href={"https://www.poel.am/product/" + product.id} target="_blank" rel="noreferrer">
                        {product.title} ({product.model}) - {product.price}
                    </a>
                </Menu.Item>
            ))}
        </Menu>
    );
    const onFinish = (values) => {
        const [startDate, endDate] = values.dateRange;
        dispatch(filterPayments.request({
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD')
        }));
    };
    const downloadExcel = () => {
        if (Array.isArray(orders) && orders.length > 0) {
            jsonToExcel(orders);
        } else {
            console.error('No data available for download or invalid data format');
        }
    };

    useEffect(()=>{
        const totalSum = orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0);
        setTotal(totalSum)
    },[orders])

    return (
        <>
            <App>
                <Form onFinish={onFinish}>
                    <Form.Item name="dateRange" label="Date Range"
                               rules={[{required: true, message: 'Please select a date range!'}]}>
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Filter Payments</Button>
                    </Form.Item>
                </Form>
                <Button onClick={downloadExcel} type="primary" style={{marginBottom: 16}}>
                    Download XML
                </Button>
                <Table
                    dataSource={orders}
                    columns={columns}
                    scroll={{y: true}}
                    rowKey="id"/>
                <div style={{marginTop: 16}}>
                    <Text strong>Total Delivery Amount: </Text>
                    <Text>{total.toFixed(2)}</Text>
                </div>
            </App>
        </>
    );
};

export default Orders;