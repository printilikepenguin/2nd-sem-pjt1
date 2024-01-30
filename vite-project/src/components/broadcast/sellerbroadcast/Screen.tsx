// BroadcastScreen.js
import { Box, Text } from "@chakra-ui/layout";
import OpenViduComponent from "../../openvidu/OpenViduComponent";
import { useState } from "react";

function BroadcastScreen() {

    const [flag, setFlag] = useState(false);
    const activateOpenVidu = () => {
        if (flag) {
            setFlag(false);
        } else {
            setFlag(true);
        }
        console.log("flag", flag);
    };

    return (
        <Box flex="1" overflow="auto" p={6}>
            <Text
                fontSize="2xl"
                fontWeight="bold"
                mb={4}
                onClick={activateOpenVidu}
            >
                방송화면
            </Text>
            <Box bg="gray.200" rounded="md" h="84vh">
                {flag ? (
                    <OpenViduComponent mySessionId="SessionB" type="broadcast" />
                ) : null}
            </Box>
        </Box>
    );
}

export default BroadcastScreen;
