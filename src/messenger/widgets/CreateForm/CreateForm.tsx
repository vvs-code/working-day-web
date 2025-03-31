import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    Button as MUIButton,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material';
import type {SelectChangeEvent} from '@mui/material/Select/SelectInput';
import {type FC, useCallback, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import MessengerAPI from '../../shared/api/MessengerAPI.ts';
import {StorageContext} from '../../shared/storage/StorageContext.tsx';

export const CreateForm: FC = () => {
    const {allEmployees, refetchChats} = useContext(StorageContext);

    const navigate = useNavigate();

    const [chatName, setChatName] = useState<string>('');
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const handleChange = useCallback((evt: SelectChangeEvent) => {
        setSelectedEmployees(typeof evt.target.value === 'string' ? evt.target.value.split(',') : evt.target.value);
    }, []);

    return (
        <div className="dialog-frame">
            <div className="dialog-frame__header">Создать чат</div>
            <div className="dialog-frame__content">
                <div className="dialog-frame__form">
                    <TextField
                        fullWidth
                        label="Название"
                        variant="outlined"
                        onChange={(evt) => setChatName(evt.target.value)}
                    />

                    <FormControl fullWidth sx={{mt: 2}}>
                        <InputLabel id="receivers-label">Участники</InputLabel>
                        <Select
                            labelId="receivers-label"
                            multiple
                            // @ts-ignore wrong type
                            value={selectedEmployees}
                            onChange={handleChange}
                            input={<OutlinedInput label="Участники" />}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {/* @ts-ignore wrong type */}
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={(() => {
                                                const employee = Object.values(allEmployees).find((employee) => {
                                                    return value === employee.id;
                                                });
                                                return `${employee.surname} ${employee.name} ${employee.patronymic ?? ''}`;
                                            })()}
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {Object.values(allEmployees).map((employee) => (
                                <MenuItem key={employee.id} value={employee.id}>
                                    {employee.surname} {employee.name} {employee.patronymic}
                                </MenuItem>
                            ))}
                        </Select>

                        <MUIButton
                            variant="contained"
                            fullWidth
                            onClick={(evt) => {
                                evt.preventDefault();
                                MessengerAPI.CreateChat({
                                    chat_name: chatName,
                                    id_list: selectedEmployees,
                                }).finally(() => {
                                    refetchChats();
                                    // TODO: Добавить navigate на чат, когда будем получать chat_id от этой ручки
                                    navigate('/messenger');
                                });
                            }}
                            sx={{mt: 2, backgroundColor: '#164f94', '&:hover': {backgroundColor: '#133d73'}}}
                        >
                            Создать
                        </MUIButton>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};
