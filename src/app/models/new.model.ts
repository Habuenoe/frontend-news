export class NewsModel {

  constructor(
    public title: string,
    public description: string,
    public createDate: string,
    public content: string,
    public author: string,
    public archiveDate?: string,
    public archived?: boolean,
    public id?: string,
  ) {
  }
}
