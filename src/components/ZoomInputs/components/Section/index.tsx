import './styles.scss';
import { ParentProps } from 'utils/propTypes';

export const Section = (props: Props) => {
  return <div className='section'>{props.children}</div>;
};

type Props = ParentProps;
