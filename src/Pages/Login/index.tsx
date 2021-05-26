import { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import request from '../../request';
import qs from 'qs';
import './style.css';

interface formFields {
  password: string;
}
class NormalLoginForm extends Component {
    state = {
      isLogin: false
    }
    onFinish = (values:formFields) => {
      request.post('/api/login', qs.stringify({
        password: values.password
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded" 
        }
      }).then((res) => {
        const data = res.data;
        if(data) {
          this.setState({
            isLogin: true
          });
          message.success("登录成功！");
        } else {
          message.error("密码错误！");
        }
      })
  };
  render() {
    const { isLogin } = this.state;
    return isLogin ? <Redirect to="/" /> : (
      <div className="login-page">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default NormalLoginForm;
