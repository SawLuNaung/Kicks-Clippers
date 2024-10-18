//import BestSeller from '../components/BestSeller'
import CustomerReviews from '../components/Reviews'
import ClipHero from '../components/ClipHero'
import Designers from '../components/Designers'
import NewsLetterBox from '../components/NewsLetterBox'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div>
      <ClipHero/>
      <Designers/>
      <CustomerReviews/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home