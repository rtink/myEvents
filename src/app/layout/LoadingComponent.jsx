import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({inverted = true}) => {
  return (
    <Dimmer inverted={inverted} active={true} >
      <Loader content='Loading...' size='massive' />
    </Dimmer>
  )
}

export default LoadingComponent;
