import React from 'react';
import { Guid } from "guid-typescript";
import DispenseInput from './DispenseInput';
import DispenseVoucher from './DispenseVoucher';
import configData from "./configuration.json";

interface State {
    canCount: number;
    bottleCount: number;
    totalSum: number;
    sessionOnGoing: boolean;
    sessionId: Guid;
}

class DispenseMachine extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            canCount: 0,
            bottleCount: 0,
            totalSum: 0,
            sessionOnGoing: false,
            sessionId: Guid.createEmpty()
        }
    }

    registerNewCan() {
        if(!this.state.sessionOnGoing)
        {
            this.setState({sessionOnGoing: true, sessionId: Guid.create()});
            this.setState({totalSum: 0, canCount: 0, bottleCount: 0});
        }

        fetch(`${configData.BACKEND_URL}/Dispense?dispenseClient=${configData.CLIENT_ID}&sessionId=${this.state.sessionId.toString()}&type=0`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.setState((state) => { return {totalSum: state.totalSum + configData.VALUE_PER_CAN}});
        this.setState((state) => { return {canCount: state.canCount + 1}});
    }

    registerNewBottle() {
        if(!this.state.sessionOnGoing)
        {
            this.setState({sessionOnGoing: true, sessionId: Guid.create()});
            this.setState({totalSum: 0, canCount: 0, bottleCount: 0});
        }

        fetch(`${configData.BACKEND_URL}/Dispense?dispenseClient=${configData.CLIENT_ID}&sessionId=${this.state.sessionId.toString()}&type=1`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.setState((state) => { return {totalSum: state.totalSum + configData.VALUE_PER_BOTTLE}});
        this.setState((state) => { return {bottleCount: state.bottleCount + 1}});
    }

    printNewVoucher() {
        if(this.state.sessionOnGoing)
        {
            this.setState({sessionOnGoing: false});

            fetch(`${configData.BACKEND_URL}/Voucher?dispenseClient=${configData.CLIENT_ID}&sessionId=${this.state.sessionId.toString()}&totalAmount=${this.state.totalSum}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }
    }

    render() {
        return (
        <div>
            <DispenseInput newCan={this.registerNewCan.bind(this)} newBottle={this.registerNewBottle.bind(this)} printVoucher={this.printNewVoucher.bind(this)}/>
            <DispenseVoucher numberOfCans={this.state.canCount} numberOfBottles={this.state.bottleCount} dispenseTotalSum={this.state.totalSum} sessionOnGoing={this.state.sessionOnGoing} sessionId={this.state.sessionId}/>
        </div>
        );
    }
}

export default DispenseMachine;