// import React, { Component } from 'react'

// class Common extends Component {
//     constructor(props){
//         super(props);

//         this.state = {};
//     }

//     componentDidMount() {
//         const { payroll, web3, account } = this.props;
//         payroll.checkInfo.call({
//             from: account
//         }).then((result) => {
//             debugger
//             console.log(result);
//             this.setState({
//                 balance: web3.fromWei(result[0].toNumber()),
//                 runway: result[1].toNumber(),
//                 employeeCount: result[2].toNumber()
//             })
//         })
//     }

//     render(){

//         const { balance, runway, employeeCount } = this.state;
//         return (
//             <div>
//                 <h2>通用信息</h2>
//                 <p>合约金额: {balance}</p>
//                 <p>员工人数: {employeeCount}</p>
//                 <p>可支付次数: {runway}</p>
//             </div>
//         );
//     }

// }

import React, { Component } from 'react'
import { Card, Col, Row } from 'antd';

class Common extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // const { payroll, web3 } = this.props;
    // const updateInfo = (error, result) => {
    //   if (!error) {
    //     this.checkInfo();
    //   }
    // }

    // this.newFund = payroll.NewFund(updateInfo);
    // this.getPaid = payroll.GetPaid(updateInfo);
    // this.newEmployee = payroll.NewEmployee(updateInfo);
    // this.updateEmployee = payroll.UpdateEmployee(updateInfo);
    // this.removeEmployee = payroll.RemoveEmployee(updateInfo);

    // this.checkInfo();

    // 暂时用来代替 solidity 的 event
    // 监听合约调用，还不如用 setInterval
     this.timer = setInterval(() => {
       this.checkInfo()
     } , 1000)
  }

  componentWillUnmount() {
    // this.newFund.stopWatching();
    // this.getPaid.stopWatching();
    // this.newEmployee.stopWatching();
    // this.updateEmployee.stopWatching();
    // this.removeEmployee.stopWatching();
    clearInterval(this.timer)
  }

  checkInfo = () => {
    const { payroll, account, web3 } = this.props;
    payroll.checkInfo.call({
      from: account,
    }).then((result) => {
      this.setState({
        balance: web3.fromWei(result[0].toNumber()),
        runway: result[1].toNumber(),
        employeeCount: result[2].toNumber()
      })
    });
  }

  render() {
    const { runway, balance, employeeCount } = this.state;
    return (
      <div>
        <h2>通用信息</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="合约金额">{balance} Ether</Card>
          </Col>
          <Col span={8}>
            <Card title="员工人数">{employeeCount}</Card>
          </Col>
          <Col span={8}>
            <Card title="可支付次数">{runway}</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Common
