import {
    useDisclosure,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/store";
import { useNavigate, useParams } from "react-router-dom";
import { stopLive } from "../../api/openVidu";

function LiveStopAlertDialog({
    isOpen,
    handleClick,
}: {
    isOpen: boolean;
    handleClick: () => void;
}) {
    const cancelRef = React.useRef(null);

    const navigate = useNavigate();

    const accessToken = useSelector(
        (state: RootState) => state.user.accessToken
    );
    const { roomId } = useParams() as { roomId: string };
    const liveBroadcastId = parseInt(roomId);

    async function handleStopLive() {
        await stopLive({ accessToken, liveBroadcastId })
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                console.log("handleStopLive stopLive error");
                navigate("/");
            });
    }

    return (
        <>
            {/* <Button hidden onClick={onOpen}></Button> */}
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={handleClick}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>방송 종료</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>방송을 종료하시겠습니까?</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleClick}>
                            취소
                        </Button>
                        <Button
                            colorScheme="themeGreen"
                            ml={3}
                            onClick={handleStopLive}
                        >
                            종료
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default LiveStopAlertDialog;
