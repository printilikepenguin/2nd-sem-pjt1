import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { Badge, Button } from "@chakra-ui/react";

interface broadcastInfo {
    liveBroadcastId: number;
    broadcastTitle: string;
    nickName: string;
    viewCount: number;
    sellerId: number;
    broadcastStatus: boolean;
    startDate: string;
}

function LiveItems({lives} : {lives: broadcastInfo}) {
    // const navigate = useNavigate();
    const handleOpenNewTab = (url: string) => {
        window.open(url, "_blank", "noopener, noreferrer");
      };

    return (
        <Flex justifyContent="space-between" alignItems="center" my="4" mx="auto" p="2" borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Flex p="2">

                <Box ml="2" pt="4">
                    <Box display='flex' alignItems='baseline'>
                        <Badge colorScheme='green'>방송종료</Badge>
                        <Box
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            textTransform='uppercase'
                            ml='2'
                            >
                            시청자수 {lives.viewCount}
                        </Box>
                    </Box>

                    <Box
                        mt='3'
                        mb='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                        >
                        {lives.broadcastTitle}
                    </Box>
                    <Divider mb="1" />
                    <Text fontSize={"sm"}>방송일자: {lives.startDate}</Text>
                </Box>
            </Flex>

            <Button onClick={()=>handleOpenNewTab(`/v1/live/result/${lives.liveBroadcastId}`)}>
                데이터확인!
            </Button>
        </Flex>
    )
}

export default LiveItems