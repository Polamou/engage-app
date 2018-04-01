export class NewIssue {
  //assigneeHref: string;
  description: string;
  creatorHref: string;
  imageUrl: string;
  additionalImageUrls: string[];
  issueTypeHref: string;
  state: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
  tags: string[];

}
