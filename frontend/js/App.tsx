import React from "react";
import {
    ThemeProvider,
    CSSReset,
    DarkMode,
    Box,
    Text,
    Input,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/core";

import ProjectList from "./components/ProjectList";

const App: React.FC = () => {
    const params = new URLSearchParams(window.location.search);
    let projectKeys: string[] = [];
    if (params.has("projects")) {
        projectKeys = params.get("projects").replace(" ", "").split(",");
    }
    return (
        <ThemeProvider>
            <DarkMode>
                <CSSReset />
                <div className="container">
                    {projectKeys.length > 0 ? (
                        <ProjectList keys={projectKeys} />
                    ) : (
                        <Box my={5} mx="auto" w="100%" maxWidth="640px">
                            <Alert
                                status="info"
                                variant="subtle"
                                flexDirection="column"
                                justifyContent="center"
                                textAlign="center"
                                height="200px"
                            >
                                <AlertIcon size="40px" mr={0} />
                                <AlertTitle mt={4} mb={2} fontSize="lg">
                                    Missing configuration
                                </AlertTitle>
                                <AlertDescription w="auto">
                                    Please provide a list of project keys. For example:
                                    <Input
                                        mt={2}
                                        size="sm"
                                        contentEditable={false}
                                        value={`${window.location.href}?projects=AA,BB,CC`}
                                    />
                                </AlertDescription>
                            </Alert>
                        </Box>
                    )}
                </div>
            </DarkMode>
        </ThemeProvider>
    );
};

export default App;
