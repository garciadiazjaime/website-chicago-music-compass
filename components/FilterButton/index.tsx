import { ReactNode } from "react"

interface Props {
  children: ReactNode | ReactNode[];
  action: any;
}

const FilterButton = ({ children, action } : Props) => {
  return <button onClick={() => action()}>
    {children}
  </button>
}

export default FilterButton;
