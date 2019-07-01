import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOrderStats } from '../../actions'
import _ from 'lodash'

import { Grid, Pagination } from 'semantic-ui-react'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend,
  LabelSeries,
} from 'react-vis'

class BarGraph extends Component {
  state = { activePage: 1 }
  parseOrderCount() {
    const { data } = this.props.stats

    return data.map(({ company, orderCount }) => {
      return {
        x: company,
        y: orderCount,
      }
    })
  }

  parseCustmomerCount() {
    const { data } = this.props.stats

    return data.map(({ company, customerCount }) => {
      return {
        x: company,
        y: customerCount,
      }
    })
  }

  labelData(attribute) {
    const { data } = this.props.stats

    return data.map(d => {
      return {
        x: d.company,
        y: Number.parseInt(d[attribute]),
        label: d[attribute],
      }
    })
  }

  handlePaginationChange = (e, { activePage }) => {
    const { query } = this.props.stats
    this.setState({ activePage })
    let retailerType = ''
    if (query.retailerType) {
      retailerType = _.join(query.retailerType, '|')
    }
    this.props.getOrderStats(query.country, retailerType, activePage)
  }

  render() {
    const { stats } = this.props
    if (!stats.count) {
      return <React.Fragment />
    }
    const totalPages = stats.count ? Number.parseInt(stats.count / 20) + 1 : 1
    return (
      <Grid columns={1}>
        <Grid.Column floated="right" width={5}>
          <Pagination
            size="mini"
            activePage={this.state.activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={totalPages}
          />
        </Grid.Column>
        <Grid.Column>
          <XYPlot
            margin={{ left: 80, bottom: 200 }}
            xType="ordinal"
            width={1200}
            height={600}
          >
            <DiscreteColorLegend
              style={{ position: 'absolute', right: '50px', top: '10px' }}
              orientation="horizontal"
              items={[
                {
                  title: 'Order Count',
                  color: '#12939A',
                },
                {
                  title: 'Customer Count',
                  color: '#79C7E3',
                },
              ]}
            />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              cluster="orderCount"
              data={this.parseOrderCount()}
            />
            <VerticalBarSeries
              cluster="customerCount"
              data={this.parseCustmomerCount()}
            />
            <LabelSeries data={this.labelData('orderCount')} />
            <LabelSeries data={this.labelData('customerCount')} />
          </XYPlot>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ orderStats }) => {
  return { stats: orderStats }
}

export default connect(
  mapStateToProps,
  { getOrderStats }
)(BarGraph)
