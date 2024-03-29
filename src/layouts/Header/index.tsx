import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Layout, theme, Button, Avatar, Dropdown, MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import { setCollapsed } from '@/redux/actions/appActions';
import Breadcrumb from './Breadcrumb';
import TranslatedButton from './TranslatedButton';
import TranslatedText from '@/components/TranslatedText';
import storage from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '@/routes/constans';

interface WrapProps {
  bg?: string;
}

const Wrap = styled(Layout.Header)<WrapProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  background-color: ${props => props.bg};
  margin: 10px 16px 0;
  border-radius: 10px;

  .right {
    display: flex;
    align-items: center;
    >div {
      margin-right: 20px;
    }
  }
`;

const Header: React.FC = () => {
  const collapsed = useSelector((state: any) => state.app.collapsed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  type Key = 'logout';
  interface ItemType extends Item {
    key: Key,
  }

  const map: Record<Key, () => void> = {
    logout: () => {
      console.log('logout');
      storage.clear();
      navigate(LOGIN_PATH);
    },
  };

  const items: ItemType[] = [{ key: 'logout', label: <TranslatedText>退出登录</TranslatedText> }];
  
  const itemClick: MenuProps['onClick'] = ({ key }) => {
    map[key as Key]();
  };

  return (
    <>
      <Wrap bg={colorBgContainer}>
        <div className="flex ai-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(setCollapsed(!collapsed))}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Breadcrumb />
        </div>
        <div className="right">
          <TranslatedButton />
          <div>
            <Dropdown menu={{ items, onClick: itemClick }}>
              <Avatar style={{ verticalAlign: 'middle' }} gap={2}>姚海雄</Avatar>
            </Dropdown>
          </div>
        </div>
      </Wrap>
    </>
  );
};

export default Header;
