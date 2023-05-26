import { Box } from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { claritySyntax } from "../../common/editor-config/claritySyntax";
import { configLanguage } from "../../common/editor-config/language";
import { liftOff } from "../../common/editor-config/init";
import { defineTheme } from "../../common/editor-config/define-theme";
import { hover } from "../../common/editor-config/autocomplete";

interface ContractOutputProps {
  contractBody: string;
}

const ContractOutput: FC<ContractOutputProps> = ({ contractBody }) => {
  const [loaded, setLoaded] = useState(false);
  const handleEditorWillMount = useCallback(
    async (monaco: Monaco) => {
      if (!loaded) {
        configLanguage(monaco);
        defineTheme(monaco);
        hover(monaco);
        await liftOff(monaco, claritySyntax);

        setLoaded(true);
      }
    },
    [loaded]
  );

  return (
    <Box w="full" h="full" bg="gray.900" borderRadius="md">
      <Editor
        beforeMount={handleEditorWillMount}
        onMount={(editor) => {
          editor.updateOptions({
            wordSeparators: "`~!@#$%^&*()=+[{]}\\|;:'\",.<>/?",
          });
        }}
        className="clarity-editor"
        defaultLanguage="clarity"
        theme="vs-dark"
        value={contractBody}
        options={{
          readOnly: true,
          fontLigatures: true,
          fontSize: 14,
          minimap: {
            enabled: false,
          },
        }}
      />
    </Box>
  );
};

export default ContractOutput;
