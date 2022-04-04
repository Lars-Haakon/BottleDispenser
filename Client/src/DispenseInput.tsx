import React from 'react';
import './DispenseInput.css';
import configData from "./configuration.json";

interface Props {
    newCan: () => void,
    newBottle: () => void,
    printVoucher: () => void
}

class DispenseInput extends React.Component<Props, any> {   
    busy = false;
    printingVoucher = false;

    constructor(props: Props) {
        super(props);
    }

    readonly newCanOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(!this.busy && this.isCurrentDisposableEmpty())
        {
            this.busy = true;
            setTimeout(this.canDispenseProcessFinished, configData.CAN_PROCESSTIME);
        }
    };

    readonly newBottleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        if(!this.busy && this.isCurrentDisposableEmpty())
        {
            this.busy = true;
            setTimeout(this.bottleDispenseProcessFinished, configData.BOTTLE_PROCESSTIME);
        }
    };

    canDispenseProcessFinished = () => {
        this.props.newCan();

        if(this.printingVoucher) {
            this.processVoucher();
        }

        this.busy = false;
    }

    bottleDispenseProcessFinished = () => {
        this.props.newBottle();

        if(this.printingVoucher) {
            this.processVoucher();
        }

        this.busy = false;
    }

    readonly newVoucherOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        this.printingVoucher = true;

        if(!this.busy)
        {
            this.busy = true;
            this.processVoucher();
            this.busy = false;
        }
    };

    render() {
        return (
            <div className="dispenseinput">
                <button id="dispensecan-button" onClick={this.newCanOnClick} />
                <button id="dispensebottle-button" onClick={this.newBottleOnClick} />
                <button id="dispensevoucher-button" onClick={this.newVoucherOnClick}/>
            </div>
          );
    }

    processVoucher() {
        this.props.printVoucher();
        this.printingVoucher=false;
    }

    isCurrentDisposableEmpty() {
        // Method simulating cans or bottles that are not empty
        const expectedNonEmptyDisposables = 10; 
        if(Math.floor(Math.random() * (expectedNonEmptyDisposables-1)) === 0)
        {
            return false;
        }

        return true;
    }
}

export default DispenseInput;
