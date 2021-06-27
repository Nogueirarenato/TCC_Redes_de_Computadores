import React, { Component } from 'react';
import './login.css';
import Logo from '../../Assets/img/Logo_Tecnologia_600x150.png'
import Logo2 from '../../Assets/img/tecnologia-logo.png'
import Url from '../../Services/zabbixService';

import { 
    Button
 } from "react-bootstrap";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            senha: "",
            userLogado: "",
            erro: ""
        }
    }
    componentDidMount() {
        document.title = "SUPER SMZ 2 SENAI 2021"
        this.setState({ erro: "" })
    }
    
    realizaLogin(event) {
        event.preventDefault();
        let user = {
            jsonrpc: "2.0",
            method: "user.login",
            params: {
                user: this.state.user,
                password: this.state.senha
            },
            id: 1,
            auth: null
        }
        fetch(Url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
        )
            .then(response => response.json())
            .then(data => {
                this.setState({ userLogado: data.token })
                //Se data.error  for false, redireciona o usuário e armazena no local storage a data token
                if (!data.error) {
                    this.setState({ erro: "Aguarde" })
                    localStorage.setItem("usuario-blocktime", data.result);
                    this.props.history.push('/Hostgroups');
                    console.log(data.token)

                }
                else this.setState({ erro: "Usuário ou senha incorretos!" })
                console.log(this.state.erro)
            })
    }
    atualizaEstadoUser(event) {
        this.setState({ user: event.target.value });
    }
    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }
    render() {
        return (
            <section id="login">

                <div className="caixa">
                    <img src={Logo} alt="Logo da empresa Block Time" className="image1" />
                    <img src={Logo2} alt="Logo da empresa Block Time" className="image2" />
                    <form onSubmit={this.realizaLogin.bind(this)}>
                        <input type="text" onChange={this.atualizaEstadoUser.bind(this)} value={this.state.user} className="input-text" placeholder="Insira o seu user zabbix" ></input>
                        <input type="password" onChange={this.atualizaEstadoSenha.bind(this)} value={this.state.senha} className="input-text" placeholder="Insira sua senha" ></input>
                        <p>{this.state.userLogado}</p>

                        
                        <Button className="btn-block btn-blocktime" type='submit' value="Entrar"  {...this.state.isLoading ? "disabled" : ""}>
                            {this.state.isLoading ? "Carregando..." : "Entrar"}
                        </Button>
                        
                        {/* <button className="login-button" type='submit' value="Entrar"  {...this.state.isLoading ? "disabled" : ""}>
                            {this.state.isLoading ? "Carregando..." : "Entrar"}
                        </button> */}

                       
                    </form>
                    <h2 style={{ color: "red", fontSize: "1.5em", margin: "3%" }}>{this.state.erro}</h2>
                </div>
                <p>Powered by SMZ SENAI 2021 </p>
            </section>)
    }
}

export default Login;