import { Autocomplete, Box, Button, LinearProgress, Paper, Slider, TextField, Tooltip, Typography } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from "react";
import { get_booking_status } from './api'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const validationSchema = Yup.object({
  no_of_weekend_nights: Yup.number().typeError("Must be a number").required('Required!'),
  no_of_week_nights: Yup.number().typeError("Must be a number").required('Required!'),
  type_of_meal_plan: Yup.number().typeError("Must be a number").required('Required!'),
  room_type_reserved: Yup.number().typeError("Must be a number").required('Required!'),
  required_car_parking_space: Yup.number().typeError("Must be a number").required('Required!'),
  lead_time: Yup.number().typeError("Must be a number").required('Required!'),
  market_segment_type: Yup.number().typeError("Must be a number").required('Required!'),
  repeated_guest: Yup.number().typeError("Must be a number").required('Required!'),
  avg_price_per_room: Yup.number().typeError("Must be a number").required('Required!'),
  no_of_special_requests: Yup.number().typeError("Must be a number").required('Required!'),

  no_of_adults: Yup.number().typeError("Must be a number").required('Required!'),
  no_of_children: Yup.number().typeError("Must be a number").required('Required!'),
  no_of_previous_cancellations: Yup.number().typeError("Must be a number").required('Required!'),
  no_of_previous_bookings_not_canceled: Yup.number().typeError("Must be a number").required('Required!'),
  arrival_date: Yup.date().required('Required!')
});

function App() {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const [load, setLoad] = useState(false)
  const [result, setResult] = useState(null)

  const formik = useFormik({
    initialValues: {

      'no_of_adults': "",
      'no_of_children': "",
      'no_of_weekend_nights': "",
      'no_of_week_nights': "",
      'type_of_meal_plan': "",
      'required_car_parking_space': "",
      'room_type_reserved': "",
      'lead_time': "",
      'market_segment_type': "",
      'repeated_guest': "",
      'no_of_previous_cancellations': "",
      'no_of_previous_bookings_not_canceled': "",
      'avg_price_per_room': "",
      'no_of_special_requests': "",
      'arrival_date': new Date("")
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoad(true)

      values = {
        ...values,
        arrival_year: new Date(values.arrival_date).getFullYear(),
        arrival_month: new Date(values.arrival_date).getMonth() + 1,
        arrival_date: new Date(values.arrival_date).getDate(),

      }

      const booking_status = await get_booking_status(values)

      setLoad(false)
      setResult(booking_status.booking_status)


      formik.resetForm()

    },
  });

  const back = () => setResult(null)

  const set_predifend = (opt) => {
    if (opt === 1) {
      formik.values.no_of_adults = 3
      formik.values.no_of_children = 0
      formik.values.no_of_weekend_nights = 0
      formik.values.no_of_week_nights = 3
      formik.values.type_of_meal_plan = 0
      formik.values.required_car_parking_space = 0
      formik.values.room_type_reserved = 1
      formik.values.lead_time = 82

      formik.values.arrival_date = new Date("2018-06-9")

      formik.values.market_segment_type = 1
      formik.values.repeated_guest = 0
      formik.values.no_of_previous_cancellations = 0
      formik.values.no_of_previous_bookings_not_canceled = 0
      formik.values.avg_price_per_room = 129.59
      formik.values.no_of_special_requests = 2
    }

    if (opt === 2) {
      formik.values.no_of_adults = 2
      formik.values.no_of_children = 0
      formik.values.no_of_weekend_nights = 2
      formik.values.no_of_week_nights = 6
      formik.values.type_of_meal_plan = 0
      formik.values.required_car_parking_space = 0
      formik.values.room_type_reserved = 0
      formik.values.lead_time = 112

      formik.values.arrival_date = new Date("2018-06-7")

      formik.values.market_segment_type = 1
      formik.values.repeated_guest = 0
      formik.values.no_of_previous_cancellations = 0
      formik.values.no_of_previous_bookings_not_canceled = 0
      formik.values.avg_price_per_room = 111.78
      formik.values.no_of_special_requests = 1
    }

    if (opt === 3) {
      formik.values.no_of_adults = 2
      formik.values.no_of_children = 0
      formik.values.no_of_weekend_nights = 0
      formik.values.no_of_week_nights = 2
      formik.values.type_of_meal_plan = 0
      formik.values.required_car_parking_space = 0
      formik.values.room_type_reserved = 0
      formik.values.lead_time = 187

      formik.values.arrival_date = new Date("2018-08-19")

      formik.values.market_segment_type = 1
      formik.values.repeated_guest = 0
      formik.values.no_of_previous_cancellations = 0
      formik.values.no_of_previous_bookings_not_canceled = 0
      formik.values.avg_price_per_room = 105.3
      formik.values.no_of_special_requests = 2
    }

    formik.submitForm()
    formik.resetForm()
  }


  const get_tooltip = (opt) => {

    let out = ""
    if (opt === 1) {

      out = `
        no of adults - 3
        no of children - 0
        no of weekend nights - 0
        no of week nights - 3
        type of meal plan - 0
        required car parking space - 0
        room type reserved - 1
        lead time - 82
        arrival date - 2018-06-9
        market segment type - 1
        repeated guest - 0
        no of previous cancellations - 0
        no of previous bookings not canceled - 0
        avg price per room - 129.59
        no of special requests - 2
      `

    }

    if (opt === 2) {
      out = `
        no of adults - 2  
        no of children - 0  
        no of weekend nights - 2  
        no of week nights - 6  
        type of meal plan - 0  
        required car parking space - 0  
        room type reserved - 0  
        lead time - 112  
        arrival date - 2018-06-7  
        market segment type - 1  
        repeated guest - 0  
        no of previous cancellations - 0  
        no of previous bookings not canceled - 0  
        avg price per room - 111.78  
        no of special requests - 1  
      `
    }

    if (opt === 3) {

      out = `
        no of adults - 2  
        no of children - 0  
        no of weekend nights - 0  
        no of week nights - 2  
        type of meal plan - 0  
        required car parking space - 0  
        room type reserved - 0  
        lead time - 187  
        arrival date - 2018-08-19  
        market segment type - 1  
        repeated guest - 0  
        no of previous cancellations - 0  
        no of previous bookings not canceled - 0  
        avg price per room - 105.3  
        no of special requests - 2  
      `
    }

    return out
  }



  return (
    <Box display='flex' alignItems='center' flexDirection='column' sx={style_scroll}>
      <Typography
        fontWeight={700}
        fontSize={isSmallScreen ? 22 :32}
        color="primary"
        marginY={2}
      >
        Reservation Cancellation Prediction
      </Typography>


      <Box width={isSmallScreen ? "95%" : "40%"} border="1px solid #FF8B03" borderRadius={1} padding={2} bgcolor="#353535" >
        <form onSubmit={formik.handleSubmit}>

          {load && !result && <Box sx={{ width: '100%' }}>
            <Typography
              fontWeight={700}
              fontSize={isSmallScreen ? 18 : 28}
              color="primary"
              marginBottom={2}
              textAlign='center'
            >
              Predicting...
            </Typography>
            <LinearProgress />
          </Box>}

          {result && <Box display="flex" alignItems="center" flexDirection="column">
            <Typography
              fontWeight={700}
              fontSize={isSmallScreen ? 18 : 28}
              color="primary"
              textAlign='center'
            >
              Predicted Result
            </Typography>
            <Slider
              sx={{ width: isSmallScreen? "60%" : "80%", marginTop: 6, marginX: 4 }}
              disabled
              value={result}
              marks={[
                { value: 0, label: 'Will not be cancelled' },
                { value: 1, label: 'Will be cancelled' },
              ]}
              max={1}
              min={0}
              step={0.001}
              size="medium"
              valueLabelDisplay="on"
            />
            <Button color="primary" variant="contained" onClick={back} sx={{ marginTop: 4, marginBottom: 0, fontWeight: 900, fontSize: 16 }}>
              Back
            </Button>
          </Box>}

          {!load && !result && <Box overflow="auto" border="1px solid #FF8B03" padding={2} borderRadius={1} sx={style_scroll} display="flex" flexDirection="column" justifyContent="space-evenly">

            <Box display="flex" justifyContent="space-evenly" flexDirection={isSmallScreen ? "column" : "row"}>
              <Box margin={1} minWidth="50%">

                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="no_of_adults"
                  label="No of adults"
                  sx={style_textbox}
                  value={formik.values.no_of_adults}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.no_of_adults && Boolean(formik.errors.no_of_adults)}
                  helperText={formik.touched.no_of_adults && formik.errors.no_of_adults}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="no_of_children"
                  label="No of children"
                  sx={style_textbox}
                  value={formik.values.no_of_children}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.no_of_children && Boolean(formik.errors.no_of_children)}
                  helperText={formik.touched.no_of_children && formik.errors.no_of_children}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="no_of_weekend_nights"
                  label="No of weekend nights"
                  sx={style_textbox}
                  value={formik.values.no_of_weekend_nights}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.no_of_weekend_nights && Boolean(formik.errors.no_of_weekend_nights)}
                  helperText={formik.touched.no_of_weekend_nights && formik.errors.no_of_weekend_nights}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="no_of_week_nights"
                  label="No of week nights"
                  sx={style_textbox}
                  value={formik.values.no_of_week_nights}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.no_of_week_nights && Boolean(formik.errors.no_of_week_nights)}
                  helperText={formik.touched.no_of_week_nights && formik.errors.no_of_week_nights}
                />


                <Autocomplete
                  size='small'
                  sx={style_txt_select}
                  fullWidth
                  options={[0, 1, 2, 3]}
                  onChange={(e, value) => formik.values.type_of_meal_plan = value}
                  getOptionLabel={option => option}
                  PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                  renderInput={(params) => (
                    < TextField
                      {...params}
                      fullWidth
                      sx={style_textbox}
                      name="type_of_meal_plan"
                      label="Type of meal plan"
                      error={formik.touched.type_of_meal_plan && Boolean(formik.errors.type_of_meal_plan)}
                      helperText={formik.touched.type_of_meal_plan && formik.errors.type_of_meal_plan}
                      onBlur={formik.handleBlur}
                    />
                  )}
                />

                <Autocomplete
                  size='small'
                  sx={style_txt_select}
                  fullWidth
                  options={[0, 1, 2, 3, 4, 5, 6]}
                  onChange={(e, value) => formik.values.room_type_reserved = value}
                  getOptionLabel={option => option}
                  PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                  renderInput={(params) => (
                    < TextField
                      {...params}
                      fullWidth
                      sx={style_textbox}
                      name="room_type_reserved"
                      label="Room type reserved"
                      error={formik.touched.room_type_reserved && Boolean(formik.errors.room_type_reserved)}
                      helperText={formik.touched.room_type_reserved && formik.errors.room_type_reserved}
                      onBlur={formik.handleBlur}
                    />
                  )}
                />

                <Autocomplete
                  size='small'
                  sx={style_txt_select}
                  fullWidth
                  options={[0, 1]}
                  onChange={(e, value) => formik.values.required_car_parking_space = value}
                  getOptionLabel={option => option}
                  PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                  renderInput={(params) => (
                    < TextField
                      {...params}
                      fullWidth
                      sx={style_textbox}
                      name="required_car_parking_space"
                      label="Required car parking space"
                      error={formik.touched.required_car_parking_space && Boolean(formik.errors.required_car_parking_space)}
                      helperText={formik.touched.required_car_parking_space && formik.errors.required_car_parking_space}
                      onBlur={formik.handleBlur}
                    />
                  )}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="no_of_previous_bookings_not_canceled"
                  label="No of previous bookings not canceled"
                  sx={style_textbox}
                  value={formik.values.no_of_previous_bookings_not_canceled}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.no_of_previous_bookings_not_canceled && Boolean(formik.errors.no_of_previous_bookings_not_canceled)}
                  helperText={formik.touched.no_of_previous_bookings_not_canceled && formik.errors.no_of_previous_bookings_not_canceled}
                />


              </Box>

              <Box margin={1} minWidth="40%">

                <Autocomplete
                  size='small'
                  fullWidth
                  options={[0, 1, 2, 3, 4]}
                  sx={style_txt_select}
                  onChange={(e, value) => formik.values.market_segment_type = value}
                  getOptionLabel={option => option}
                  PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                  renderInput={(params) => (
                    < TextField
                      {...params}
                      fullWidth
                      sx={style_textbox}
                      name="market_segment_type"
                      label="Market segment type"
                      error={formik.touched.market_segment_type && Boolean(formik.errors.market_segment_type)}
                      helperText={formik.touched.market_segment_type && formik.errors.market_segment_type}
                      onBlur={formik.handleBlur}
                    />
                  )}
                />

                <Autocomplete
                  size='small'
                  fullWidth
                  options={[0, 1]}
                  sx={style_txt_select}
                  onChange={(e, value) => formik.values.repeated_guest = value}
                  getOptionLabel={option => option}
                  PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                  renderInput={(params) => (
                    < TextField
                      {...params}
                      fullWidth
                      sx={style_textbox}
                      name="repeated_guest"
                      label="Repeated guest"
                      error={formik.touched.repeated_guest && Boolean(formik.errors.repeated_guest)}
                      helperText={formik.touched.repeated_guest && formik.errors.repeated_guest}
                      onBlur={formik.handleBlur}
                    />
                  )}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="avg_price_per_room"
                  label="Avg price per room"
                  sx={style_textbox}
                  value={formik.values.avg_price_per_room}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.avg_price_per_room && Boolean(formik.errors.avg_price_per_room)}
                  helperText={formik.touched.avg_price_per_room && formik.errors.avg_price_per_room}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="no_of_special_requests"
                  label="No of special requests"
                  sx={style_textbox}
                  value={formik.values.no_of_special_requests}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.no_of_special_requests && Boolean(formik.errors.no_of_special_requests)}
                  helperText={formik.touched.no_of_special_requests && formik.errors.no_of_special_requests}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="no_of_previous_cancellations"
                  label="No of previous cancellations"
                  sx={style_textbox}
                  value={formik.values.no_of_previous_cancellations}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.no_of_previous_cancellations && Boolean(formik.errors.no_of_previous_cancellations)}
                  helperText={formik.touched.no_of_previous_cancellations && formik.errors.no_of_previous_cancellations}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="date"
                  name="arrival_date"
                  label="Arrival date"
                  sx={style_textbox}
                  value={formik.values.arrival_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.arrival_date && Boolean(formik.errors.arrival_date)}
                  helperText={formik.touched.arrival_date && formik.errors.arrival_date}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  size='small'
                  type="string"
                  name="lead_time"
                  label="Lead_time"
                  sx={style_textbox}
                  value={formik.values.lead_time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lead_time && Boolean(formik.errors.lead_time)}
                  helperText={formik.touched.lead_time && formik.errors.lead_time}
                />

              </Box>
            </Box>


            <Typography color="primary"  > Pre-defiend values </Typography>
            <Box display="flex" justifyContent="space-evenly" border="1px solid #FF8B03" paddingY={1} borderRadius={1} >

              <Tooltip title={get_tooltip(1)}>
                <Button color="primary" variant="contained" size="small" onClick={() => set_predifend(1)} sx={{ width: isSmallScreen ? 80 : 100, fontWeight: 500, fontSize: 11 }}>
                  Not Cancel
                </Button>
              </Tooltip>

              <Tooltip title={get_tooltip(2)}>
                <Button color="primary" variant="contained" size="small" onClick={() => set_predifend(2)} sx={{ width: isSmallScreen ? 80 : 100, fontWeight: 500, fontSize: 11 }}>
                  Not Sure
                </Button>
              </Tooltip>

              <Tooltip title={get_tooltip(3)}>
                <Button color="primary" variant="contained" size="small" onClick={() => set_predifend(3)} sx={{ width: isSmallScreen ? 80 : 100, fontWeight: 500, fontSize: 11 }}>
                  Cancel
                </Button>
              </Tooltip>

            </Box>

          </Box>}



          {!load && !result && <Button size="small" color="primary" variant="contained" fullWidth type="submit" sx={{ marginTop: 2, marginBottom: 0, fontWeight: 900, fontSize: 18 }}>
            Preditct
          </Button>}
        </form>

      </Box>

    </Box>
  );
}

export default App;


const style_scroll = {
  '&::-webkit-scrollbar': {
    width: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 25,
    backgroundColor: '#FF8B03',
  },
  '& a': {
    textDecoration: "none",
    color: "background.mainbg"
  },
  '&:-webkit-autofill': {
    transitionDelay: '9999s',
    transitionProperty: 'background-color, color',
  },
}

const style_textbox = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FF8B03', // Change border color
    },
    '&:hover fieldset': {
      borderColor: '#FF8B03', // Change hover color
    },
  },
  '& .MuiInputLabel-root': {
    color: 'orange', // Change label color
  },
  marginBottom: 1.5

}

const style_txt_select = {
  '.css-i4bv87-MuiSvgIcon-root': {
    color: '#FF8B03'
  },
  '.css-ptiqhd-MuiSvgIcon-root': {
    color: '#FF8B03'
  }
}

const paperStyle = {
  bgcolor: "background.mainbg",
  borderRadius: 0.3,
  mt: 0.5,
  "li": {
    color: "white",
    px: 2
  },
}