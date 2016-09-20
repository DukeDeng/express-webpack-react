import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';
import Ajax from './tools/ajax.jsx';

const FormItem = Form.Item;

/**
 * 如果采用es6写法，即class Register extends React.Component有个问题:
 *    方法中无法调用this.props.form，比如checkPassword()方法.
 *    对于handleSubmit(e)方法，可以通过<Form onSubmit={this.handleSubmit.bind(this)}>解决这个问题，参考login.jsx.
 */
let Register = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    const data = this.props.form.getFieldsValue();
    console.log(data);
    if (data.username && data.password && data.password2 && data.email) {
      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          console.log('输入存在错误, 具体信息如下:\n', errors);
          return;
        }
        Ajax.post('http://localhost:8900/register',
                  { username: data.username, password: data.password, email: data.email },
                  r => {
                    console.log(r);
                    if (r.result === true) {
                      window.location.href = '/';
                    }
                  }
        );
        console.log(values);
      });
    } else {
      console.log('带*的为必填信息');
    }
  },

  checkPassword(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (!value) {
      callback('密码不能为空');
    } else {
      validateFields(['password2'], { force: true });
      callback();
    }
  },

  checkPassword2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  },

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const { getFieldProps } = this.props.form;
    const usernameProps = getFieldProps('username', {
      validate: [{
        rules: [{ required: true, max: 16 }],
        trigger: 'onBlur',
      }],
    });
    const passwordProps = getFieldProps('password', {
      rules: [{ required: true, min: 6, message: '密码长度不得小于6' },
              { validator: this.checkPassword }],
    });
    const password2Props = getFieldProps('password2', {
      rules: [{ required: true },
              { validator: this.checkPassword2 }],
    });
    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [{ required: true }],
        trigger: 'onBlur',
      }, {
        rules: [{ type: 'email', message: '请输入正确的邮箱地址.' }],
        trigger: ['onBlur', 'onChange'],
      }],
    });
    return (
      <div style={{ margin: '100px auto' }}>
        <Row type="flex" align="middle" justify="space-around">
          <Col span={8}>
            <Form horizontal >
              <FormItem {...formItemLayout} label="用户名" hasFeedback>
                <Input placeholder="最多16位" {...usernameProps} />
              </FormItem>

              <FormItem {...formItemLayout} label="密码" hasFeedback>
                <Input type="password" placeholder="不少于6位" {...passwordProps} />
              </FormItem>

              <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                <Input type="password" placeholder="再次输入密码" {...password2Props} />
              </FormItem>

              <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                <Input type="email" placeholder="email" {...emailProps} />
              </FormItem>

              <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 20 }}>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>注册</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  },
});

Register = Form.create()(Register);

export default Register;
