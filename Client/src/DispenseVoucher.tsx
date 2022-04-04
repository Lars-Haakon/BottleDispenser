import React from 'react';
import { Guid } from "guid-typescript";
import configData from "./configuration.json";

interface Props {
    numberOfCans: number,
    numberOfBottles: number,
    dispenseTotalSum: number,
    sessionOnGoing: boolean,
    sessionId: Guid
}

class DispenseVoucher extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let voucher;
        if(!this.props.sessionOnGoing && !this.props.sessionId.isEmpty())
        {
            voucher =<p>Thank you for dispensing! here is the ID for your voucher: {this.props.sessionId.toString()}</p>
        }

        return (<div className="dispensevoucher">
            <p>Number of cans dispensed: {this.props.numberOfCans}</p>
            <p>Number of bottles dispensed: {this.props.numberOfBottles}</p>
            <br/>
            <p>Total dispense sum: {this.props.dispenseTotalSum} {configData.CURRENCY}</p>
            {voucher}
        </div>);
    }
}

export default DispenseVoucher;