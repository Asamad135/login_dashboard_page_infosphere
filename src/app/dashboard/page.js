'use client'
import { Content, Grid, Column, Button } from '@carbon/react';
import {
  Archive,
  DataRefineryReference,
  TrashCan,
  Compare,
  UserAdmin,
  Settings
} from '@carbon/icons-react';
import styles from '@/styles/Dashboard.module.scss';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const handleArchiveClick = () => {
    router.push('/dashboard/archive');
  };

  return (
    <Content className={styles.contentContainer}>
      <h1 className={styles.dashboardTitle}>File Operations</h1>
      <Grid fullWidth narrow className={styles.gridContainer}>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            onClick={handleArchiveClick}
            renderIcon={Archive}
          >
            <h2>Archive</h2>
          </Button>
        </Column>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            renderIcon={DataRefineryReference}
          >
            <h2>Extract</h2>
          </Button>
        </Column>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            renderIcon={TrashCan}
          >
            <h2>Delete</h2>
          </Button>
        </Column>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            renderIcon={Compare}
          >
            <h2>Convert/Compare</h2>
          </Button>
        </Column>
      </Grid>

      <h1 className={styles.dashboardTitle}>Administration</h1>
      <Grid fullWidth narrow className={styles.gridContainer}>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            renderIcon={UserAdmin}
          >
            <h2>Manage Users</h2>
          </Button>
        </Column>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            renderIcon={Settings}
          >
            <h2>Options</h2>
          </Button>
        </Column>
      </Grid>
    </Content>
  );
}

