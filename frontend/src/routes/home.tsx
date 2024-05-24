import SearchBar from '../components/Home/SearchBar';
import AttractionCard from '../components/Home/AttractionCard';
import { FeaturesProvider } from '../components/Home/FeatureContext.tsx';


export default function Home() {
  return (
    <FeaturesProvider>
      <main>
        <SearchBar />
        <AttractionCard />
      </main>
    </FeaturesProvider>
  )
}
