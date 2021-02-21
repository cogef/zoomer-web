import { FormControlLabel, Switch, Tab, Tabs } from '@material-ui/core';
import { Page } from 'components/Page';
import { ChangeEvent, useState } from 'react';
import { Redirect, Route, Switch as RouteSwitch, useHistory, useRouteMatch } from 'react-router-dom';
import { routes } from 'routes/routes';
import { useIsAdmin } from 'utils/zoomer/adminContext';
import { PreviousTab } from './tabs/PreviousTab';
import { UpcomingTab } from './tabs/UpcomingTab';

export const MeetingsPage = () => {
  const history = useHistory();
  const match = useRouteMatch<PathParams>(`${routes.MEETINGS}/:type`);
  const tabPath = match?.params.type;

  const [showAll, setShowAll] = useState(false);
  const isAdmin = useIsAdmin();

  const handleTabChange = (_: ChangeEvent<{}>, value: any) => {
    history.push(`${routes.MEETINGS}/${value}`);
  };

  return (
    <Page className='manage-page' title='Upcoming Meetings'>
      <Tabs value={tabPath} onChange={handleTabChange}>
        <Tab label='Upcoming' value={tabs.UPCOMING.value} />
        <Tab label='Previous' value={tabs.PREVIOUS.value} />
      </Tabs>
      {isAdmin && (
        <div>
          <FormControlLabel
            label='Show All'
            control={<Switch color='primary' checked={showAll} onChange={() => setShowAll(s => !s)} />}
          />
        </div>
      )}

      <RouteSwitch>
        <Route exact path={tabs.UPCOMING.path}>
          <UpcomingTab showAll={showAll} />
        </Route>

        <Route exact path={tabs.PREVIOUS.path}>
          <PreviousTab showAll={showAll} />
        </Route>

        <Redirect to={tabs.UPCOMING.path} />
      </RouteSwitch>
    </Page>
  );
};

const tabs = {
  UPCOMING: {
    path: `${routes.MEETINGS}/upcoming`,
    value: 'upcoming',
  },
  PREVIOUS: {
    path: `${routes.MEETINGS}/previous`,
    value: 'previous',
  },
};

type PathParams = {
  type: string;
};
