import React from 'react'
import {Link} from 'react-router'; // eslint-disable-line no-unused-vars
import {Nav} from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import {LinkMenuItem} from '../shared'; // eslint-disable-line no-unused-vars
import * as _ from 'underscore';

export class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: [],
        };
        this.activateItem = this.activateItem.bind(this)
    }

    activateItem(item) {
        this.setState({
            activeItem: item
        });
    }

    render() {
        var self = this;
        var nav = [];
        if (this.props.env) {
            var activeItem = this.state.activeItem;
            var apps = window.appconfig.envApps[this.props.env];
            if (!_.isEmpty(apps)) {
                nav.push(<LinkMenuItem key="apps" to={`/${self.props.env}/apps`}
                                       active={activeItem[0]==='apps' && !activeItem[1]}>Apps</LinkMenuItem>);
                _.map(apps, function(app) {
                    nav.push(<LinkMenuItem key={`apps-${app}`} to={`/${self.props.env}/apps/${app}`} subitem={true}
                                           active={activeItem[0]==='apps' && activeItem[1]===app}>{app}</LinkMenuItem>);
                });
            }
            var jobs = window.appconfig.envJobs[this.props.env];
            if (!_.isEmpty(jobs)) {
                nav.push(<LinkMenuItem key="jobs" to={`/${self.props.env}/jobs`}
                                       active={activeItem[0]==='jobs' && !activeItem[1]}>Jobs</LinkMenuItem>);
                _.map(jobs, function(job) {
                    nav.push(<LinkMenuItem key={`jobs-${job}`} to={`/${self.props.env}/jobs/${job}`} subitem={true}
                                           active={activeItem[0]==='jobs' && activeItem[1]===job}>{job}</LinkMenuItem>);
                });
            }
            nav.push(<LinkMenuItem key="nodes" to={`/${self.props.env}/nodes`}
                                   active={activeItem[0]==='nodes'}>Nodes</LinkMenuItem>);
            nav.push(<LinkMenuItem key="pods" to={`/${self.props.env}/pods`}
                                   active={activeItem[0]==='pods'}>Pods</LinkMenuItem>);
        }
        return (
            <Nav ulClassName="side-nav" stacked={true}>
                {nav}
            </Nav>
        );
    }
}
