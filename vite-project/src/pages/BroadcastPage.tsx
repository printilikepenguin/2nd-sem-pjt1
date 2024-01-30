import { Flex, Box } from "@chakra-ui/layout";
import { Resizable } from "re-resizable";
import Header from "../components/broadcast/sellerbroadcast/Header";
import BroadcastScreen from "../components/broadcast/sellerbroadcast/Screen";
import Chat from "../components/broadcast/sellerbroadcast/Chat";
import Menu from "../components/broadcast/sellerbroadcast/Menu";

function Broadcast() {
    // const codeRef = useRef(null);
    // const dimensions = useSize(codeRef);
    // const MIN_CONTENT_WIDTH = 363
    // const shouldWrap = dimensions?.width > MIN_CONTENT_WIDTH

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex flex="1" overflow="hidden">
                {/* <Box bg='tomato' w='34%' resize='horizontal'>
                    <BroadcastScreen />
                </Box>
                <Box bg='blue' w='33%' resize='horizontal'>
                    <BroadcastScreen />
                </Box>
                <Box bg='green' w='33%' resize='horizontal'>
                    <BroadcastScreen />
                </Box> */}
                <BroadcastScreen />
                <Resizable
                    handleStyles={{
                        left: {
                            width: '3px',
                            height: '100%',
                            left: '0px',
                            backgroundColor: '#d1d5db',
                        },
                    }}
                >

                <Chat />
                </Resizable>
                <Menu />
            </Flex>
        </Flex>
    );
}

export default Broadcast;
