import React from 'react';
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    key: 'sub1',
    label: 'Dashboard',
    icon: <UserOutlined/>,
    children: [
      {
        key: 'g1',
        label: 'Users',
        type: 'group',
        children: [
          {
            key: '1',
            label: 'Students',
          },
          {
            key: '2',
            label: 'Teachers',
          },
        ],
      },
      // {
      //   key: 'g2',
      //   label: 'Grade',
      //   type: 'group',
      //   children: [
      //     {
      //       key: '3',
      //       label: '12 Grade',
      //     },
      //     {
      //       key: '4',
      //       label: 'Option 4',
      //     },
      //   ],
      // },
    ],
  },
  {
    key: 'sub2',
    label: 'Grades',
    children: [
      {
        key: '5',
        label: 'Grade 1',
      },
      {
        key: '6',
        label: 'Grade 2',
      },
      {
        key: '7',
        label: 'Grade 3',
      },
      {
        key: '8',
        label: 'Grade 4',
      },
      {
        key: '9',
        label: 'Grade 5',
      },
      {
        key: '10',
        label: 'Grade 6',
      },
      {
        key: '11',
        label: 'Grade 7',
      },
      {
        key: '12',
        label: 'Grade 8',
      },
      {
        key: '13',
        label: 'Grade 9',
      },
      {
        key: '14',
        label: 'Grade 10',
      },
      {
        key: '15',
        label: 'Grade 11',
      },
      {
        key: '16',
        label: 'Grade 12',
      },
      // {
      //   key: 'sub3',
      //   label: 'Submenu',
      //   children: [
      //     {
      //       key: '7',
      //       label: 'Option 7',
      //     },
      //     {
      //       key: '8',
      //       label: 'Option 8',
      //     },
      //   ],
      // },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Subjects',
    children: [
      {
        key: '17',
        label: 'Mathematics',
      },
      {
        key: '18',
        label: 'Literature',
      },
      {
        key: '19',
        label: 'English',
      },
      {
        key: '20',
        label: 'History',
      },
      {
        key: '21',
        label: 'Physics',
      },
      {
        key: '22',
        label: 'Chemistry',
      },
      {
        key: '23',
        label: 'Civic Education',
      },
      {
        key: '24',
        label: 'Technology',
      },
      {
        key: '25',
        label: 'Biology',
      },
      {
        key: '26',
        label: 'Geography',
      },
    ],
  },
  {
    key: 'grp',
    label: 'Setting',
    type: 'group',
    children: [
      {
        key: '27',
        label: 'Setting',
      },
      {
        key: '28',
        label: 'Sign out',
      },
    ],
  },
];
const AdminPage = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default AdminPage;