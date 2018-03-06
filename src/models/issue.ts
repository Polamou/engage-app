export class Issue {
  id: string;
  assigneeHref: string;
  href: string;
  description: string;
  creatorHref: string;
  createdAt: Date;
  updatedAt: Date;
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
