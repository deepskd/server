import React from "react";
import { Grid, Label, Segment, Item, Icon } from "semantic-ui-react";

class OrderItem extends React.Component {
  renderArticleStatus = article => {
    if (article.status === "In Production") {
      return (
        <React.Fragment>
          Expected Delivery {article.expectedDeliveryDate}
        </React.Fragment>
      );
    } else if (article.status === "Delivered") {
      return (
        <React.Fragment>
          Delivered on 01-Jan-2019
          <Label as="a" href={article.trackingUrl} target="_blank">
            <Icon name="plane" />
            {article.trackingNo}
          </Label>
        </React.Fragment>
      );
    }
  };
  renderArticles = articles => {
    return articles.map(article => {
      return (
        <Item.Group>
          <Item>
            <Item.Image size="tiny" src={article.imageUrl} />
            <Item.Content>
              <Item.Meta>
                {this.renderArticleStatus(article)}
                <br />
                Quantity {article.quantity}
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
      );
    });
  };
  render() {
    const { order } = this.props;
    return (
      <React.Fragment>
        <Label attached="top left" color="blue">
          {order.orderName}
        </Label>
        <Label attached="top right" color="blue">
          {order.orderBy}
        </Label>
        <Segment basic size="mini">
          <Grid columns={2}>
            <Grid.Column width={14}>
              {this.renderArticles(order.articles)}
            </Grid.Column>
            <Grid.Column width={2}>
              <Label color="blue" ribbon="right">
                {order.orderNo}
                <br />
                {order.orderDate}
              </Label>
            </Grid.Column>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default OrderItem;
