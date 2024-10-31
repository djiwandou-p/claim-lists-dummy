import React, { useState } from 'react';
import { Tabs, Tab, Box, styled } from '@mui/material';
import { Filter, Search } from 'lucide-react';
import { FeedbackWidget } from './components/FeedbackWidget';

// Custom styled Tab component for multi-line text
const StyledTab = styled(Tab)({
  minHeight: '72px',
  padding: '8px 16px',
  '& .MuiTab-wrapper': {
    display: 'block',
    whiteSpace: 'normal',
    textAlign: 'center',
    lineHeight: '1.2',
  },
});

function App() {
  const [value, setValue] = useState(2);
  const [showFeedback, setShowFeedback] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const formatTabLabel = (label: string, count: number) => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px'
    }}>
      <span>{label}</span>
      <span>({count})</span>
    </Box>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold p-6">Claims List</h1>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tabs 
            value={value} 
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              flex: 1,
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 120
              }
            }}
          >
            <StyledTab label={formatTabLabel('All', 0)} />
            <StyledTab label={formatTabLabel('Open', 5)} />
            <StyledTab label={formatTabLabel('Calculation', 3641)} />
            <StyledTab label={formatTabLabel('Calculation In Review', 193)} />
            <StyledTab label={formatTabLabel('Negotiation', 603)} />
            <StyledTab label={formatTabLabel('Approval', 183)} />
            <StyledTab label={formatTabLabel('Request for Edit', 1077)} />
          </Tabs>
          
          <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
            <Search className="text-gray-600 cursor-pointer" size={24} />
            <Filter className="text-gray-600 cursor-pointer" size={24} />
          </Box>
        </Box>
      </Box>

      {/* Claims Table Header */}
      <Box sx={{ 
        mt: 2,
        px: 2,
        py: 1.5,
        bgcolor: 'white',
        display: 'flex',
        gap: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '& > *': {
          flex: 1,
          fontWeight: 'bold',
          color: 'text.secondary'
        }
      }}>
        <div>CLAIM ID</div>
        <div>CLAIM TYPE</div>
        <div>NAMA KAPAL</div>
        <div>VOYAGE NO</div>
        <div>DATE CREATED</div>
        <div>PORT ATA</div>
        <div>PORT ATD</div>
        <div>STATUS</div>
      </Box>

      {/* Sample Claim Row */}
      <Box sx={{ 
        px: 2,
        py: 1.5,
        bgcolor: 'white',
        display: 'flex',
        gap: 2,
        '& > *': {
          flex: 1,
        }
      }}>
        <div>107577</div>
        <div>Slow Speed</div>
        <div>TB SEA MASTER & ...</div>
        <div>24026</div>
        <div>28/10/2024</div>
        <div>JAMBI</div>
        <div>TANJUNG UBAN</div>
        <div>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            Calculation in Progress
          </span>
        </div>
      </Box>

      {showFeedback && <FeedbackWidget onClose={() => setShowFeedback(false)} />}
    </div>
  );
}

export default App;