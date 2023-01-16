import { Box, Flex, Link, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

import link from 'lib/link/link';
import CodeEditor from 'ui/shared/CodeEditor';
import CopyToClipboard from 'ui/shared/CopyToClipboard';

interface Props {
  data: string;
  hasSol2Yml: boolean;
  address?: string;
}

const ContractSourceCode = ({ data, hasSol2Yml, address }: Props) => {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={ 3 }>
        <Text fontWeight={ 500 }>Contract source code</Text>
        { hasSol2Yml && address && (
          <Tooltip label="Visualize contract code using Sol2Uml JS library">
            <Link
              href={ link('visualize_sol2uml', undefined, { address }) }
              ml="auto"
              mr={ 3 }
            >
                View Sol2uml
            </Link>
          </Tooltip>
        ) }
        <CopyToClipboard text={ data }/>
      </Flex>
      <CodeEditor value={ data } id="source_code"/>
    </Box>
  );
};

export default React.memo(ContractSourceCode);