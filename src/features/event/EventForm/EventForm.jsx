/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { 
  composeValidators, 
  combineValidators, 
  isRequired, 
  hasLengthGreaterThan} 
from 'revalidate';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';


const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event =  {}

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }
  return {
    initialValues: event
  };
};

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'The category is required'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Description must be greater than 5 characters'})
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired({message: 'Date & Time are required'})
})

const actions = {
  createEvent,
  updateEvent
};

const category = [
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'lgbtq', text: 'LGBTQ', value: 'lgbtq'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'currentAffairs', text: 'Current Affairs', value: 'currentAffairs'},
    {key: 'politics', text: 'Politics', value: 'politics'},
    {key: 'economics', text: 'Economics', value: 'economics'},
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {}
  }

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/images/user.png',
        hostedBy: 'Patty'
      }
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('city', selectedCity)
      })
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      })
  }

  render() {
    const { history, initialValues, invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete='off'>
              <Field 
                name='title'
                component={TextInput}
                placeholder='Name of your event'
              />
              <Field 
                name='category'
                component={SelectInput}
                options={category}
                // multiple={true}
                placeholder='What is your event about?'
              />
              <Field 
                name='description'
                component={TextArea}
                rows={3}
                placeholder='Describe your event'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field 
                name='city'
                component={PlaceInput}
                options={{types: ['(cities)']}}
                onSelect={this.handleCitySelect}
                placeholder='Event City'
              />
              <Field
                name='venue'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                onSelect={this.handleVenueSelect}
                placeholder='Event Venue'
              />
              <Field 
                name='date'
                component={DateInput}
                dateFormat='MMMM d, yyyy h:mm aa'
                // dateFormat='dd LLL yyyy h:mm a'
                showTimeSelect
                timeFormat='h:mm aa'
                // timeFormat='HH:mm'
                placeholder='Event Date'
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive 
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={initialValues.id 
                ? () => history.push(`/events/${initialValues.id}`)
                : () => history.push('/events')
                }
                type="button">Cancel
              </Button>
            </Form>
        </Segment>
        </Grid.Column>
      </Grid>
      
    )
  }
}

export default connect(
  mapState, 
  actions
  )(reduxForm({ form: 'eventForm', validate })(EventForm));