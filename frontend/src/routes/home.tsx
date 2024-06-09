import { useState } from 'react';
import { Box, Container } from '@mui/material';
import SearchBar from '../components/Home/SearchBar';
import AttractionCard from '../components/Home/AttractionCard';
import Sidebar from '../components/Schedule/sidebar';
import TopMenuBar from '../components/TopMenuBar';
import AddNewSchedule from '../components/Schedule/AddNewSchedule';
import { FeaturesProvider } from '../components/Home/FeatureContext';


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [schedules, setSchedules] = useState<{ id: number, name: string, startDate: Date | null, endDate: Date | null }[]>([
    { id: 5, name: '行程1', startDate: new Date('2021-10-01'), endDate: new Date('2021-10-03') },
    { id: 6, name: '行程2', startDate: new Date('2021-10-05'), endDate: new Date('2021-10-07') },
    { id: 7, name: '行程3', startDate: new Date('2021-10-09'), endDate: new Date('2021-10-11') },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const addSchedule = (name: string, startDate: Date | null, endDate: Date | null) => {
    // setSchedules([...schedules, {name, startDate, endDate }]);
  };

  return (
    <FeaturesProvider>
      <Box display="flex" sx={{ transition: 'margin 0.3s', marginRight: sidebarOpen ? '240px' : '0' }}>
        <Box flexGrow={1}>
          <TopMenuBar toggleSidebar={toggleSidebar} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <SearchBar />
            <AttractionCard />
          </Container>
        </Box>
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} toggleModal={toggleModal} schedules={schedules} />
        <AddNewSchedule open={modalOpen} onClose={toggleModal} addSchedule={addSchedule} />
      </Box>
    </FeaturesProvider>
  );
}
