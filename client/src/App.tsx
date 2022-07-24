import "antd/dist/antd.css";

import RecordSearchPage from "@/pages/RecordSearchPage";
import DefaultContainer from "@/components/DefaultContainer";

function App() {
  return (
    <DefaultContainer>
      {/* SUGGESTION: Add a routing layer here */}
      <RecordSearchPage />
    </DefaultContainer>
  );
}

export default App;
