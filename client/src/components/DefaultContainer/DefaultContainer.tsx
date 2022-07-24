import React from "react";

import { Breadcrumb, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

import styles from "./DefaultContainer.module.css";

type Props = {
  children: React.ReactNode;
};

function DefaultContainer({ children }: Props) {
  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={[{ label: "Procurement search", key: "search" }]}
        />
      </Sider>
      <Layout className={styles.siteLayout}>
        <Header
          className={styles.siteLayoutBackground}
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Stotles</Breadcrumb.Item>
            <Breadcrumb.Item>Procurement search</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className={styles.siteLayoutBackground}
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default DefaultContainer;
