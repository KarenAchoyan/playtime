import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UserAddOutlined,
    FormOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import Link from "next/link";
import {useRouter} from "next/router";
import NavbarContext from "../../../providers/NavBarContext";
import {useSearchParams} from "next/navigation";
import {handleLogout} from "../../../configs/axiosIntance";

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;


const Navbar = (props) => {

    const {subMenu, setSubMenu} = useContext(NavbarContext)

    const [collapsed, setCollapsed] = useState(false);
    const {token: {colorBgContainer}} = theme.useToken();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleLogoutBtn = async () => {
        handleLogout()
        const nextUrl = searchParams.get("next");
        router.push(nextUrl ?? "/login");
    };

    function selectSub(s) {
        setSubMenu(s)
    }

    const getSelectedKey = (path) => {
        const currentPath = router.pathname;
        const key = currentPath.split('/').slice(-2).join('/')
        return key === path;
    };


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={subMenu} defaultOpenKeys={[subMenu]}>
                    <Menu.Item key="1" icon={<UserOutlined/>}>
                        <Link href="/admin">Admin</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" onClick={() => selectSub("sub2")} icon={<FormOutlined/>} title="Slides">
                        <Menu.Item key="3" className={getSelectedKey("slide/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/slide/all">All Slides</Link>
                        </Menu.Item>
                        <Menu.Item key="4" className={getSelectedKey("slide/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/slide/add">Create Slide</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub33" onClick={() => selectSub("sub33")} icon={<FormOutlined/>} title="Faqs">
                        <Menu.Item key="3" className={getSelectedKey("faq/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/faq/all">All Faqs</Link>
                        </Menu.Item>
                        <Menu.Item key="4" className={getSelectedKey("faq/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/faq/add">Create Faq</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" onClick={() => selectSub("sub3")} icon={<FormOutlined/>} title="Blog">
                        <Menu.Item key="8" className={getSelectedKey("blog/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/blog/all">All Blogs</Link>
                        </Menu.Item>
                        <Menu.Item key="9" className={getSelectedKey("blog/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/blog/add">Create Blog</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="subf3" onClick={() => selectSub("subf3")} icon={<FormOutlined/>} title="Brand">
                        <Menu.Item key="8" className={getSelectedKey("brand/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/brand/all">All Brands</Link>
                        </Menu.Item>
                        <Menu.Item key="9" className={getSelectedKey("brand/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/brand/add">Create Brand</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" onClick={() => selectSub("sub5")} icon={<UserOutlined/>} title="Contact">
                        <Menu.Item key="13"
                                   className={getSelectedKey("contact/update") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/contact/update">Update Info</Link>
                        </Menu.Item>
                        <Menu.Item key="17"
                                   className={getSelectedKey("slogan/about") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/slogan/about">Slogan</Link>
                        </Menu.Item>
                        <Menu.Item key="14"
                                   className={getSelectedKey("contact/formResult") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/contact/formResult">Form Result</Link>
                        </Menu.Item>
                        <Menu.Item key="15"
                                   className={getSelectedKey("contact/about") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/contact/about">About page</Link>
                        </Menu.Item>
                    </SubMenu>
                    {/*<SubMenu key="sub6" onClick={() => selectSub("sub6")} icon={<UserOutlined/>} title="Instagrams">*/}
                    {/*    <Menu.Item key="6"*/}
                    {/*               className={getSelectedKey("contact/update") ? "ant-menu-item-selected" : ""}>*/}
                    {/*        <Link href="/admin/instas/add">Add</Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*    <Menu.Item key="7"*/}
                    {/*               className={getSelectedKey("instagram/all") ? "ant-menu-item-selected" : ""}>*/}
                    {/*        <Link href="/admin/instas/all">All</Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*</SubMenu>*/}
                    <SubMenu key="sub4"  onClick={() => selectSub("sub4")}
                             icon={<UserAddOutlined/>}
                             title="Category">
                        <Menu.Item key="15"
                                   className={getSelectedKey("category/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/category/all">All Categories</Link>
                        </Menu.Item>
                        <Menu.Item key="16"
                                   className={getSelectedKey("category/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/category/add">Create Category</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub19"  onClick={() => selectSub("sub19")}
                             icon={<UserAddOutlined/>}
                             title="Products">
                        <Menu.Item key="17" className={getSelectedKey("car/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/products/all">All Products</Link>
                        </Menu.Item>
                        <Menu.Item key="18" className={getSelectedKey("car/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/products/add">Create Product</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub30" onClick={() => selectSub("sub30")}
                             icon={<UserAddOutlined/>}
                             title="User">
                        <Menu.Item key="31" className={getSelectedKey("car/all") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/user/all">All</Link>
                        </Menu.Item>
                        <Menu.Item key="32" className={getSelectedKey("car/add") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/user/add">Create User</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub7" onClick={() => selectSub("sub7")} icon={<UserOutlined/>} title="Payment">
                        <Menu.Item key="20"
                                   className={getSelectedKey("contact/update") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/payment/orders">Orders</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="23" onClick={handleLogoutBtn} icon={<LogoutOutlined/>}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{padding: 0, backgroundColor: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content style={{margin: '24px 16px', padding: 24, minHeight: 280}}>
                    <div style={{minHeight: '80vh'}}>
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};


export default Navbar;