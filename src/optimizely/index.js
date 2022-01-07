import { useState } from "react";

import {
  useDecision,
} from '@optimizely/react-sdk';

function Decision({ userId, setHasOnFlag }) {
    // Generally React SDK runs for one client at a time i.e for one user throughout the lifecycle.
    // You can provide the user Id once while wrapping the app in the Provider component and the SDK will memoize and reuse it throughout the application lifecycle.
    // For this example, we are simulating 10 different users so we will ignore this and pass override User IDs to the useDecision hook for demonstration purpose.
    // This override will not be needed for normal react sdk use cases.
    const [decision, clientReady] = useDecision('background_colour', {}, {overrideUserId: userId});
  
    // Don't render the component if SDK client is not ready yet.
    if (!clientReady) {
      return ''
    }
  
    const variationKey = decision.variationKey;
  
    // did decision fail with a critical error?
    if (variationKey === null) {
      console.log(' decision error: ', decision['reasons']);    
    }
    //console.log('__________ flagKey', decision.flagKey)
    if (decision.enabled) {
      setTimeout(() => setHasOnFlag(true));
    }  
  
    // get a dynamic configuration variable
    // "sort_method" corresponds to a variable key in your Optimizely project
    const booleanVar = decision.variables['boolean_variable'];
    //console.log('DE', decision.enabled )
    //console.log('DE', booleanVar )
  
    const onDecision = ({ type, userId, attributes, decisionInfo }) => { console.log('__________ type', type);
    // Add a DECISION Notification Listener for type FLAG
    if (type === 'flag') {
      // Access information about feature, for example, key and enabled status
      console.log('____________ flagKey', decisionInfo['flagKey']);
      console.log('____________ enabled', decisionInfo['enabled']);
      console.log('____________ decisionEventDispatched', decisionInfo['decisionEventDispatched']);
      console.log('____________ variables', decisionInfo['variables']);
      // Send data to analytics provider here
    }
  }
  
  const notificationId = optimizelyClient.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.DECISION, onDecision);
  // import your third-party analytics integration here
  
  ///////////////////////////////////////////
  // SET UP DECISION NOTIFICATION LISTENER //
  ///////////////////////////////////////////
  
  
  
  // Remove Notification Listener
  optimizelyClient.notificationCenter.removeNotificationListener(notificationId);
  
  // Remove All Notification Listeners
  optimizelyClient.notificationCenter.clearAllNotificationListeners();
  
  // Remove all Notification Listeners of a certain type
  optimizelyClient.notificationCenter.clearNotificationListeners(enums.NOTIFICATION_TYPES.DECISION);
  
    return (    
      <Pre>
        {`\n       Flag ${decision.enabled ? 'on' : 'off'}...${userId}...flag variation: ${variationKey}...boolean_variable : ${booleanVar}...flag rule key : ${decision.ruleKey}`}
      </Pre>    
    );
  }