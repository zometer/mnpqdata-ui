import { ScaleLoader } from 'react-spinners';
import variables from 'App.scss'

function Loading() {
  return (
    <section className="content loading">
      <ScaleLoader color={variables.spinnerColor} loading={true} />
    </section>
  );
}

export default Loading;