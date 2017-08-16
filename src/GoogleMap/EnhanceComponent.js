import React, {Component} from 'react';

const EnhanceComponent =  LoaderComponent => BaseComponent => {
    return class EnhanceComponent extends Component {
        state = {
            name: 'You have been enhanced'
        }
        render() {
            return (
                <div>
                    <LoaderComponent />
                    <BaseComponent
                    {...this.state}
                    />
                </div>
            )
        }
    }
}

export default EnhanceComponent;