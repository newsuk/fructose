import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  DrawerItems,
} from 'react-navigation';
import DrawerHeader from "./drawerHeader";
import ParentNavigationItem from "./parentNavigationItem";

const styles = StyleSheet.create({
  parentDrawerTouch: {
    paddingLeft: 13,
    paddingTop: 15
  },
  header: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  },
  version: {
    padding: 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'left'
  },
  text: {
    paddingTop: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  view: {
    backgroundColor: 'lightpink',
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1
  }
});

const getParentComponentNames = obj => [
  ...new Set(obj.map(item => item.key.split('/')[0]).filter(parent => parent !== 'Home'))
];

class MainDrawer extends Component {
  constructor({items, ...restProps}) {
    super();

    this.items = items;
    this.restProps = restProps;

    this.state = {
      parentDrawer: true
    };

    this.parents = getParentComponentNames(this.items);
    this.navigateToCallback = this.navigateToCallback.bind(this)
  }

  navigateToCallback() {
		this.setState({ parentDrawer: true });
	};


   renderParentItems(parentsToRender){
     return parentsToRender.map(item => (<ParentNavigationItem key={item} label={item} onPress={() => {
      this.setState({
        parentDrawer: false,
        selectedParent: item})
    }} />) )
   } 

  render() {
    if (this.state.parentDrawer) {
      return ([
        <DrawerHeader navigateToCallback={this.navigateToCallback} />,
        <ScrollView>
          <TouchableOpacity style={styles.parentDrawerTouch} />
          {this.renderParentItems(this.parents)}
        </ScrollView>
      ]);
    }

    const items = this.items.filter(item => item.key.split('/')[0] === this.state.selectedParent)
    
    return ([
      <DrawerHeader parentDrawer={() => this.state.parentDrawer} navigateToCallback={this.navigateToCallback} />,
      <ScrollView>
        <DrawerItems items={items} {...this.restProps}/> 
      </ScrollView>
    ])
  }
}

export default MainDrawer;

