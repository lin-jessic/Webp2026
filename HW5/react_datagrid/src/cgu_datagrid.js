import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

function CGU_DataGrid() {
  const url =
    'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';

  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // HW5 要求：使用 useEffect 呼叫 API，並更新 DataGrid 資料
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const newRows = data.map((item, index) => {
          let location = '';
          let price = '';

          if (item.showInfo && item.showInfo.length > 0) {
            location = item.showInfo[0].location || '';
            price = item.showInfo[0].price || '';
          }

          return {
            id: index + 1,
            title: item.title || '',
            location: location,
            price: price,
          };
        });

        setRows(newRows);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('API 資料讀取失敗，請稍後再試。');
        setLoading(false);
      });
  }, []);

  // 搜尋功能：依照展覽名稱或地點搜尋
  const filteredRows = useMemo(() => {
    if (keyword.trim() === '') {
      return rows;
    }

    return rows.filter((row) => {
      return (
        row.title.includes(keyword.trim()) ||
        row.location.includes(keyword.trim()) ||
        row.price.includes(keyword.trim())
      );
    });
  }, [keyword, rows]);

  const columns = [
    {
      field: 'title',
      headerName: '展覽名稱',
      flex: 2,
      minWidth: 300,
      headerClassName: 'datagrid-header',
    },
    {
      field: 'location',
      headerName: '地點',
      flex: 2,
      minWidth: 300,
      headerClassName: 'datagrid-header',
    },
    {
      field: 'price',
      headerName: '票價',
      flex: 1,
      minWidth: 180,
      headerClassName: 'datagrid-header',
    },
  ];

  return (
    <Box className="page">
      <Box className="title-row">
        <Typography variant="h4" component="h1" className="main-title">
          景點觀光展覽資訊
        </Typography>

        <TextField
          label="搜尋名稱"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="search-input"
        />
      </Box>

      {errorMessage !== '' && (
        <Alert severity="error" className="error-message">
          {errorMessage}
        </Alert>
      )}

      <Box className="datagrid-box">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#04AA6D',
              color: 'white',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#04AA6D',
              color: 'white',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#f2f2f2',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default CGU_DataGrid;