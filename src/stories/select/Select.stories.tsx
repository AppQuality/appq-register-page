import {BSCol, Container} from "../layout/Layout"
import {Card} from "../card/Card"
import {GetOptionsAsync, GetOptionsAsyncResponse, Select, SelectProps} from "./Select"
import {Story, Meta} from "@storybook/react"
import {aqBootstrapTheme} from "../theme/defaultTheme";
import {ThemeProvider} from "styled-components";

export default {
  title: "Select",
  component: Select,
} as Meta;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const groupedOptions = [
  { label: 'Colors',
    options: [
      {value: "ocean", label: "Ocean"},
      {value: "blue", label: "Blue", isDisabled: true},
      {value: "purple", label: "Purple"},
      {value: "red", label: "Red", isFixed: true},
      {value: "orange", label: "Orange"},
      {value: "yellow", label: "Yellow"},
      {value: "green", label: "Green"},
      {value: "forest", label: "Forest"},
      {value: "slate", label: "Slate"},
      {value: "silver", label: "Silver"},
   ]
  },
  {label: 'Flavours',
    options: [
      {value: "vanilla", label: "Vanilla", rating: "safe"},
      {value: "chocolate", label: "Chocolate", rating: "good"},
      {value: "strawberry", label: "Strawberry", rating: "wild"},
      {value: "salted-caramel", label: "Salted Caramel", rating: "safe"},
   ]
  }
]

const asyncOptions = [
  {value: "ocean", label: "Ocean"},
  {value: "blue", label: "Blue", isDisabled: true},
  {value: "purple", label: "Purple"},
  {value: "red", label: "Red", isFixed: true},
  {value: "orange", label: "Orange"},
  {value: "yellow", label: "Yellow"},
  {value: "green", label: "Green"},
  {value: "forest", label: "Forest"},
  {value: "slate", label: "Slate"},
  {value: "silver", label: "Silver"},
  {value: "vanilla", label: "Vanilla", rating: "safe"},
  {value: "chocolate", label: "Chocolate", rating: "good"},
  {value: "strawberry", label: "Strawberry", rating: "wild"},
  {value: "salted-caramel", label: "Salted Caramel", rating: "safe"},
  {value: "indian-red", label: "Indian Red"},
  {value: "crimson", label: "Crimson"},
  {value: "lightpink", label: "Light Pink"},
  {value: "palevioletred", label: "Pale Violet Red"},
  {value: "lavenderblush", label: "Lavender Blush"},
  {value: "violetred", label: "Violet Red"},
  {value: "maroon", label: "Maroon"},
  {value: "orchid", label: "Orchid"},
  {value: "plum", label: "Plum"},
]

const getAsyncOptions: GetOptionsAsync = (start, search ) => {
  const limit = 10;
  const total = asyncOptions.length;
  return new Promise<GetOptionsAsyncResponse>((resolve) => {
    setTimeout(() => {
      if (search) {
        const filteredRes = asyncOptions.filter(opt => {
          return opt.value.indexOf(search) > 0;
        })
      } else {
        const res = asyncOptions.slice((start*limit), (limit * (start+1)));
        return resolve({results:res, more: (start < Math.floor(total/limit))});
      }
    }, 1500);
  });
}

const Template: Story<SelectProps> = (args) => {
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <Container>
        <BSCol size='col-lg-9'>
          <Card>
            <Select {...args} />
          </Card>
        </BSCol>
      </Container>
    </ThemeProvider>
  );
};

export const SelectBase = Template.bind({});
SelectBase.args = {
  options: options
};

export const GroupedAsync = Template.bind({});
GroupedAsync.args = {
  options: groupedOptions,
  isSearchable: true
};

export const SelectAsync = Template.bind({});
SelectAsync.args = {
  options: getAsyncOptions,
  isSearchable: true
}