import React from "react";
import "./Toast.css"
import { toaster, ToastMoods } from "./Toaster";

export default class Toast extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            mood: ToastMoods.happy
        }
        toaster.toastComponent = this;
        // toaster.setToast('Welcome', ToastMoods.happy)
    }

    clear() {
        this.setState({
            message: '',
            mood: ToastMoods.happy
        })
    }

    createToast(message, mood) {
        this.setState({
            message,
            mood
        })
    }

    render() {
        return (this.state.message ? <div className={`toast toast--${this.state.mood} expand`}>{this.state.message}</div>: null)
    }
}