function showMore(uid) {
    alert('the attendee you selected is: ' + uid);
}

$(function () {
  var Attendee = Backbone.Model.extend({
    defaults: {
      _id: -1,
      fname: '',
      lname: '',
      email: '',
      contrib: 0,
      newAttendee: 'first',
      gender: ''
    },
    
    initialize: function() {
      
    }
  });
  
  var AttendeeList = Backbone.Collection.extend({
    model: Attendee,
    
    getNewAttendee: function () {
      return this.where({newAttendee: 'first'});
    },
    
    sortAttribute: 'fname',
    sortDirection: 1,
    
    sortAttendees: function (attr, order) {
      this.sortAttribute = attr;
      this.sortDirection = order;
      this.sort();
    },
    
    comparator: function (a, b) {
      var a = a.get(this.sortAttribute),
          b = b.get(this.sortAttribute);
      
      if (a == b) return 0;
      
      if (this.sortDirection == 1) {
        return a > b ? 1 : -1;
      }
      else {
        return a < b ? 1 : -1;
      }
    }
  });
  
  var AttendeeView = Backbone.View.extend({
    
    tagName: 'table',
    className: 'table table-striped table-hover',
    template: null,
    
    sortUpIcon: 'ui-icon-triangle-1-n',
    sortDownIcon: 'ui-icon-triangle-1-s',
    
    initialize: function () {
      this.template = _.template($('#attendee-table').html());
      this.listenTo(this.collection, 'sort', this.updateTable);
    },
    
    events: {
      'click th': 'headerClick'
    },
    
    render: function () {
      this.$el.html(this.template());
      
      this.updateTable();
      
      return this;
    },
    
    updateTable: function () {
      var ref = this.collection, $table;
      _.invoke(this._attendeeRowViews, 'remove');
      
      $table = this.$('tbody');
      
      this._attendeeRowViews = this.collection.map( function (currentAttendee) {
        //console.log('first name is: ' + currentAttendee.get('fname'));
        var currentRowView = new AttendeeRowView({model: ref.get(currentAttendee)});
        
        $table.append(currentRowView.render().$el);
        return currentRowView;
      });
    }
    
  });
  
  var AttendeeRowView = Backbone.View.extend({
    tagName: 'tr',
    template: null,
    events: {
      'click a': 'edit'
    },
    
    initialize: function () {
      this.template = _.template($('#attendee-row').html());
      this.listenTo(this.model, 'change', this.render);
    },
    
    render: function () {
      var testRow = '<tr><td>hi there</td></tr>'
      //this.$el.html(testRow);
      this.$el.html(this.template(this.model.toJSON()));
      console.log(this.template(this.model.toJSON()));
      return this;
    },
    edit: function () {
      console.log('show the edit form');
    },
  });
  
  console.log('creating attendees');
  var fakeAttendees = new AttendeeList([
    new Attendee({ _uid: 1, fname: 'dave', lname: 'blanchard', email: 'dblanchard11305@gmail.com', contrib: 50, dob: (new Date(1961, 7, 9)), newAttendee: 'first', gender: 'male'}),
    new Attendee({ _uid: 1, fname: 'janet', lname: 'rostron', email: 'jrb@gmail.com', contrib: 25, dob: (new Date(1964, 11, 4)), newAttendee: '', gender: 'female'})  
  ]);
  
  var attendeeView = new AttendeeView({ collection: fakeAttendees});
  $('#divAttendees').html(attendeeView.render().$el.attr('id', 'tableAttendees'));
});