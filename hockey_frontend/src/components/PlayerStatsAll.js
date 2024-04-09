import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import jsonData from '../data/all_teams.json'; // 确保路径正确
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useParams } from 'react-router-dom';
import ProgressBar from './progressBar';
const countryFlags = {
  USA: '🇺🇸',
  JPN: '🇯🇵',
  GBR: '🇬🇧',
  CAN: '🇨🇦',
  FRA: '🇫🇷',
  DEU: '🇩🇪',
  ITA: '🇮🇹',
  BRA: '🇧🇷',
  IND: '🇮🇳',
  RUS: '🇷🇺',
  CHN: '🇨🇳',
  AUS: '🇦🇺',
  ESP: '🇪🇸',
  MEX: '🇲🇽',
  KOR: '🇰🇷',
  TUR: '🇹🇷',
  NLD: '🇳🇱',
  SWE: '🇸🇪',
  CHE: '🇨🇭',
  BEL: '🇧🇪',
  NOR: '🇳🇴',
  DNK: '🇩🇰',
  FIN: '🇫🇮',
  NZL: '🇳🇿',
  POL: '🇵🇱',
  ZAF: '🇿🇦',
  PRT: '🇵🇹',
  ARG: '🇦🇷',
  COL: '🇨🇴',
  SAU: '🇸🇦',
  EGY: '🇪🇬',
  ISR: '🇮🇱',
  QAT: '🇶🇦',
  UAE: '🇦🇪',
  // 更多国家...
};
// 假定jsonData的结构与您的需求一致
const rows = jsonData.map((item) =>
    ({
      countryCode:item['BIRTH COUNTRY'],
      name: item["PLAYER"],
      AAV:item['AAV'],
      team: item["TEAM_FULL_NAMES"],
      season: item["SEASON"],
      calories: item["GOALS/60"],
      POSITION: item['POSITION'],
      TOI: item['TOI'],
      GP: item['GP'],
      GOALS:item['GOALS'],
      SHOTS:item['SHOTS'],
      TAKEAWAYS:item['TAKEAWAYS'],
      HITS:item['HITS'],
      TOIGP: item['TOI/GP'],
      GOALS60: item['GOALS/60'],
      TOTAL_ASSISTS60: item['TOTAL ASSISTS/60'],
      FIRST_ASSISTS60: item['FIRST ASSISTS/60'],
      SECOND_ASSISTS60: item['SECOND ASSISTS/60'],
      TOTAL_POINTS60: item['TOTAL POINTS/60'],
      IPP: item['IPP'],
      SHOTS60: item['SHOTS/60'],
      SH: item['SH%'],
      IXG60: item['IXG/60'],
      ICF60: item['ICF/60'],
      IFF60: item['IFF/60'],
      ISCF60: item['ISCF/60'],
      IHDCF60: item['IHDCF/60'],
      RUSH_ATTEMPTS60: item['RUSH ATTEMPTS/60'],
      REBOUNDS_CREATED60: item['REBOUNDS CREATED/60'],
      PIM60: item['PIM/60'],
      TOTAL_PENALTIES60: item['TOTAL PENALTIES/60'],
      MINOR60: item['MINOR/60'],
      MAJOR60: item['MAJOR/60'],
      MISCONDUCT60: item['MISCONDUCT/60'],
      PENALTIES_DRAWN60: item['PENALTIES DRAWN/60'],
      GIVEAWAYS60: item['GIVEAWAYS/60'],
      TAKEAWAYS60: item['TAKEAWAYS/60'],
      HITS60: item['HITS/60'],
      HITS_TAKEN60: item['HITS TAKEN/60'],
      SHOTS_BLOCKED60: item['SHOTS BLOCKED/60'],
      FACEOFFS_WON60: item['FACEOFFS WON/60'],
      FACEOFFS_LOST60: item['FACEOFFS LOST/60'],
      FACEOFFS_PERCENT: item['FACEOFFS %'],
      CF60: item['CF/60'],
      CA60: item['CA/60'],
      CF_PERCENT: item['CF%'],
      FF60: item['FF/60'],
      FA60: item['FA/60'],
      FF_PERCENT: item['FF%'],
      SF60: item['SF/60'],
      SA60: item['SA/60'],
      SF_PERCENT: item['SF%'],
      GF60: item['GF/60'],
      GA60: item['GA/60'],
      GF_PERCENT: item['GF%'],
      XGF60: item['XGF/60'],
      XGA60: item['XGA/60'],
      XGF_PERCENT: item['XGF%'],
      SCF60: item['SCF/60'],
      SCA60: item['SCA/60'],
      SCF_PERCENT: item['SCF%'],
      HDCF60: item['HDCF/60'],
      HDCA60: item['HDCA/60'],
      HDCF_PERCENT: item['HDCF%'],
      HDGF60: item['HDGF/60'],
      HDGA60: item['HDGA/60'],
      HDGF_PERCENT: item['HDGF%'],
      MDCF60: item['MDCF/60'],
      MDCA60: item['MDCA/60'],
      MDCF_PERCENT: item['MDCF%'],
      MDGF60: item['MDGF/60'],
      MDGA60: item['MDGA/60'],
      MDGF_PERCENT: item['MDGF%'],
      LDCF60: item['LDCF/60'],
      LDCA60: item['LDCA/60'],
      LDCF_PERCENT: item['LDCF%'],
      LDGF60: item['LDGF/60'],
      LDGA60: item['LDGA/60'],
      LDGF_PERCENT: item['LDGF%'],
      ON_ICE_SH_PERCENT: item['ON-ICE SH%'],
      ON_ICE_SV_PERCENT: item['ON-ICE SV%'],
      PDO: item['PDO'],
      OFF_ZONE_STARTS60: item['OFF. ZONE STARTS/60'],
      NEU_ZONE_STARTS60: item['NEU. ZONE STARTS/60'],
      DEF_ZONE_STARTS60: item['DEF. ZONE STARTS/60'],
      PERCENTAGE:item['PERCENTAGE'],
    })
  );


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// 定义表头
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Player',
  },
  {
    id: 'season',
    numeric: false,
    disablePadding: false,
    // label: 'Calories',
    label: 'Season',
  },
  {
    id: 'team',
    numeric: false,
    disablePadding: false,
    // label: 'Calories',
    label: 'Teams',
  },
  {
    id: 'POSITION',
    numeric: false,
    disablePadding: false,
    label: 'Position',
  },
  {
    id: 'GP',
    numeric: true,
    disablePadding: false,
    label: 'GP',
  },
  {
    id: 'TOI',
    numeric: true,
    disablePadding: false,
    label: 'TOI',
  },
  {
    id: 'IPP',
    numeric: true,
    disablePadding: false,
    label: 'IPP',
  },
  {
    id: 'TOTAL ASSISTS/60',
    numeric: true,
    disablePadding: false,
    label: 'PRED/ACTUAL',
  },
  {
    id: 'Nationalite',
    numeric: true,
    disablePadding: false,
    label: 'Nationalite',
  },
  {
    id: 'SALARY',
    numeric: true,
    disablePadding: false,
    label: 'SALARY',
  },
  
  {
    id: 'GOALS',
    numeric: true,
    disablePadding: false,
    label: 'GOALS',
  },
  {
    id: 'SHOTS',
    numeric: true,
    disablePadding: false,
    label: 'SHOTS',
  },
  {
    id: 'TAKEAWAYS',
    numeric: true,
    disablePadding: false,
    label: 'TAKEAWAYS',
  },
  {
    id: 'HITS',
    numeric: true,
    disablePadding: false,
    label: 'HITS',
  },
  
];

function EnhancedTableHead(props) {

  
  
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


function EnhancedTableToolbar(props) {
  const { numSelected, filterPosition, setFilterPosition } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            All Players
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="Team">Year</InputLabel>
            <Select
              labelId="Team"
              id="Team"
              value="{filterPosition}"
              onChange={(e) => setFilterPosition(e.target.value)}
              label="Team"
            >
              <MenuItem value="2022-23">
                <em>2022-23</em>
              </MenuItem>
              <MenuItem value="2007-08">2007-08</MenuItem>
              <MenuItem value="2008-09">2008-09</MenuItem>
              <MenuItem value="2009-10">2009-10</MenuItem>
              <MenuItem value="2010-11">2010-11</MenuItem>
              <MenuItem value="2011-12">2011-12</MenuItem>
              <MenuItem value="2012-13">2012-13</MenuItem>
              <MenuItem value="2013-14">2013-14</MenuItem>
              <MenuItem value="2014-15">2014-15</MenuItem>
              <MenuItem value="2015-16">2015-16</MenuItem>
              <MenuItem value="2016-17">2016-17</MenuItem>
              <MenuItem value="2017-18">2017-18</MenuItem>
              <MenuItem value="2018-19">2018-19</MenuItem> 
              <MenuItem value="2019-20">2019-20</MenuItem>
              <MenuItem value="2020-21">2020-21</MenuItem>
              <MenuItem value="2021-22">2021-22</MenuItem>
              <MenuItem value="2022-23">2022-23</MenuItem>
              <MenuItem value="2023-24">2023-24</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterPosition: PropTypes.string.isRequired,
  setFilterPosition: PropTypes.func.isRequired,
};

export default function EnhancedTable2() {

  
  // 组件状态
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  // 事件处理器和其他逻辑保持不变
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const { teamName } = useParams();
  
  const [filterPosition, setFilterPosition] = React.useState(teamName);

  // 其他组件逻辑保持不变

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy))
      .filter(row => filterPosition === row.season)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filterPosition], // 添加 filterPosition 作为依赖项
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} filterPosition={filterPosition} setFilterPosition={setFilterPosition} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                    
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.season}</TableCell>
                  <TableCell align="right">{row.team}</TableCell>
                  
                  <TableCell align="right">{row.POSITION}</TableCell>
                  <TableCell align="right">{row.GP}</TableCell>
                  <TableCell align="right">{row.TOI}</TableCell>
                  <TableCell align="right">{row.IPP}</TableCell>
                 
                  <TableCell align="right">{row.PERCENTAGE}</TableCell>
                  <TableCell align="right" style={{ fontSize: '32px' }}>
                    {countryFlags[row.countryCode] || '🇺🇳'}
                  </TableCell>
                  <TableCell align="right">{row.AAV}</TableCell>
                  
                  <TableCell align="right">{row.GOALS}</TableCell>
                  <TableCell align="right">{row.SHOTS}</TableCell>
                  <TableCell align="right">{row.TAKEAWAYS}</TableCell>
                  {/* {/* <TableCell align="right">{row.HITS}</TableCell> */}
                  <TableCell align="right">{row.HITS}</TableCell>
                    <TableCell align="right">
              </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
