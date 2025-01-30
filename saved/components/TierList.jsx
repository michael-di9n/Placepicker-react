import Tier from "./Tier";
import AvailableItems from "./AvailableItems";
export default function TierList({tierList, isLoading, loadingText, onSelectItem  }) {
  const keys = Object.keys(tierList)

  const handleSelectPlace = () => {}
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '80%', height: '100%'}}  className="places-category">
      {keys.map(k => <Tier key={k} tierLevel={k} items={tierList[k]} />)}
    </div>
  );
}
