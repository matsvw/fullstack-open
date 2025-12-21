import { render, screen, within } from "@testing-library/react-native";
import repositories from "../../mocks/repositories";
import RepositoryListContainer from "../../components/RepositoryListContainer";
import { shortenNumber } from "../../utils/formatter";

const checkRepoFields = (renderedItem, dataItem) => {
  expect(within(renderedItem).getByText(dataItem.fullName)).toBeDefined();
  expect(within(renderedItem).getByText(dataItem.description)).toBeDefined();
  expect(within(renderedItem).getByText(dataItem.language)).toBeDefined();
  expect(
    within(renderedItem).getByText(shortenNumber(dataItem.forksCount))
  ).toBeDefined();
  expect(
    within(renderedItem).getByText(shortenNumber(dataItem.stargazersCount))
  ).toBeDefined();
  expect(
    within(renderedItem).getByText(shortenNumber(dataItem.ratingAverage))
  ).toBeDefined();
  expect(
    within(renderedItem).getByText(shortenNumber(dataItem.reviewCount))
  ).toBeDefined();
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      render(<RepositoryListContainer repositories={repositories} />);
      //screen.debug();

      const firstNode = repositories.edges[0].node;
      const secondNode = repositories.edges[1].node;

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(repositories.edges.length); //make sure we have the same number of items in the list
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      repositoryItems.forEach((r, i) => {
        console.log("Testing item ", i);
        checkRepoFields(r, repositories.edges[i].node);
      });
    });
  });
});
